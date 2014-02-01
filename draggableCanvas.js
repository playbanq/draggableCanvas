/** 
 * @param {} -
 * @returns {} -
 */
var DraggableCanvas = Object.create({}, {
    'extend': {
        value: draggableCanvas
    }
});

function draggableCanvas(canvas, options) {
    // Validate that the canvas parameter is indeed an existing canvas element
    if (canvas.nodeName !== 'CANVAS') {
        console.log('ERROR: The element provided is not a canvas element.');
        return;
    }

    // Track cursor position
    var cursor = { x: undefined, y: undefined },
        mouseDown = false,
        dragKeyDown = false,
        alwaysDraggable = false,
        autoDrag = true,
        onDropCallback;

    // Define the canvas object interface
    var properties = {
        onDrag: {
            value: function (options, callback) {
                var dragKeyCode;

                if (typeof options === 'function') {
                    callback = options;
                    dragKeyCode = 16;
                } else if (typeof options === 'object') {
                    if (options.alwaysDraggable) {
                        alwaysDraggable = true;
                        dragKeyDown = true;
                        canvas.style.cursor = 'move';
                    }
                    if (typeof options.autoDrag === 'boolean') {
                        autoDrag = options.autoDrag;
                    }
                } 

                document.addEventListener('keydown', function (event) {
                    if (event.keyCode === dragKeyCode) {
                        var marginTop = parseInt(canvas.style.top) || 0,
                            marginLeft = parseInt(canvas.style.left) || 0;

                        cursor.x = event.clientX - marginLeft;
                        cursor.y = event.clientY - marginTop;

                        canvas.style.cursor = 'move';
                        dragKeyDown = true;
                    }
                });
                document.addEventListener('keyup', function (event) {
                    if (event.keyCode === dragKeyCode) {
                        canvas.style.cursor = 'auto';
                        dragKeyDown = false;
                    }
                });

                canvas.addEventListener('mousedown', function (event) {
                    var marginTop = parseInt(canvas.style.top) || 0,
                        marginLeft = parseInt(canvas.style.left) || 0;

                    if (dragKeyDown) {
                        canvas.style.cursor = 'move';
                    }

                    cursor.x = event.clientX - marginLeft;
                    cursor.y = event.clientY - marginTop;
                    mouseDown = true;
                });
                document.addEventListener('mousemove', function (event) {
                    var currentX = event.clientX, 
                        currentY = event.clientY,
                        top = Math.floor(currentY - cursor.y),
                        left = Math.floor(currentX - cursor.x);

                    if (dragKeyDown && mouseDown) {
                        if (autoDrag) {
                            canvas.style.top = top + 'px';
                            canvas.style.left = left + 'px';
                        }
                        callback(top, left, currentX, currentY);
                    }
                });
                document.addEventListener('mouseup', function (event) {
                    mouseDown = false;
                    if (!alwaysDraggable) {
                        canvas.style.cursor = 'auto';
                    }
                    if (typeof onDropCallback === 'function') {
                        onDropCallback(event.clientX, event.clientY);
                    }
                });
            }      
        },
        onDrop: {
            value: function (callback) {
                onDropCallback = callback;
            }      
        },
        setSize: {
            writable: true,
            value: function (newWidth, newHeight) {
                canvas.width = newWidth || window.innerWidth;
                canvas.height = newHeight || window.innerHeight;
            }
        }
    }
    

    Object.defineProperties(canvas, properties);
    var extendedCanvas = Object.create({}, properties);
    if (typeof options === 'object' && options.autoDrag) {
        extendedCanvas.onDrag(options, function () {});
    }
    
    return extendedCanvas;
}
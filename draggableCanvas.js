/** 
 * @param {} -
 * @returns {} -
 */
var DraggableCanvas = Object.create({}, {
    'extend': {
        value: draggableCanvas
    }
});

function draggableCanvas(canvas, outerCanvas) {
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
        onDropCallback;

    // Define the canvas object interface
    var properties = {
        onDrag: {
            value: function (options, callback) {
                var dragKeyCode;

                if (typeof options === 'function') {
                    callback = options;
                    dragKeyCode = 16;
                } else if (options === 0) {
                    alwaysDraggable = true;
                    dragKeyDown = true;
                    canvas.style.cursor = 'move';
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
                        currentY = event.clientY;

                    if (dragKeyDown && mouseDown) {
                        canvas.style.top = Math.floor(currentY - cursor.y) + 'px';
                        canvas.style.left = Math.floor(currentX - cursor.x) + 'px';
                        callback(canvas.style.top, canvas.style.left, currentX, currentY);
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
    
    return Object.create({}, properties);
}
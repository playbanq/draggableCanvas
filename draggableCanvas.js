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
        onDropCallback;

    // Define the canvas object interface
    var properties = {
        onDrag: {
            value: function (keyCode, callback) {
                var dragKeyDown = false;
                if (typeof keyCode === 'function') {
                    callback = keyCode;
                    dragKeyDown = true;
                }

                document.addEventListener('onkeydown', function (event) {
                    console.log(event.keyCode);
                });

                canvas.addEventListener('mousedown', function (event) {
                    var container = canvas.getBoundingClientRect();
                    cursor.x = event.clientX;
                    cursor.y = event.clientY;
                    mouseDown = true;
                });
                document.addEventListener('mousemove', function (event) {
                    var container = canvas.getBoundingClientRect(),
                        currentX = event.clientX, 
                        currentY = event.clientY,
                        marginTop = parseInt(canvas.style.top) || 0,
                        marginLeft = parseInt(canvas.style.left) || 0;
                    if (dragKeyDown && mouseDown) {
                        canvas.style.top = Math.floor(currentY - cursor.y) + 'px';
                        canvas.style.left = Math.floor(currentX - cursor.x) + 'px';
                        // callback();
                    }
                });
                document.addEventListener('mouseup', function (event) {
                    mouseDown = false;
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
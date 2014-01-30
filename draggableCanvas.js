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
    var cursor = { x: undefined, y: undefined };

    // Define the canvas object interface
    var properties = {
        onDrag: {
            value: function (callback) {
            
            }      
        },
        onDrop: {
            value: function (callback) {
            
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
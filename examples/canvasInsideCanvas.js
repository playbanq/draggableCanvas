var canvas = document.getElementById('draggableCanvas'),
    context = canvas.getContext('2d');

DraggableCanvas.extend(canvas);
canvas.setSize(100, 100);
context.fillStyle = 'rgba(128, 128, 223, 0.5)';
context.fillRect(0, 0, 100, 100);
canvas.style.position = 'relative';

// Handle canvas drag and drop
canvas.onDrag(function (top, left) {
    
});
canvas.onDrop(function (x, y) {
    
});
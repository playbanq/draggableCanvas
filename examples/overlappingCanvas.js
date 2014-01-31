var canvas1 = document.getElementById('draggableCanvas'),
    context1 = canvas1.getContext('2d'),
    canvas2 = document.getElementById('draggableCanvas2'),
    context2 = canvas2.getContext('2d'),
    options = {
        alwaysDraggable: true,
    };

// Canvas 1: Blue
DraggableCanvas.extend(canvas1);
canvas1.setSize(100, 100);
context1.fillStyle = 'rgba(128, 128, 223, 0.8)';
context1.fillRect(0, 0, 100, 100);
canvas1.style.position = 'absolute';
canvas1.style.top = '50px';
canvas1.style.left = '50px';
canvas1.onDrag(options, function () {
    canvas2.style.zIndex = 1;
    canvas1.style.zIndex = 2;
});

// Canvas 2: Red
DraggableCanvas.extend(canvas2);
canvas2.setSize(100, 100);
context2.fillStyle = 'rgba(223, 128, 128, 0.8)';
context2.fillRect(0, 0, 100, 100);
canvas2.style.position = 'absolute';
canvas2.style.top = '100px';
canvas2.style.left = '100px';
canvas2.onDrag(options, function () {
    canvas1.style.zIndex = 1;
    canvas2.style.zIndex = 2;
});
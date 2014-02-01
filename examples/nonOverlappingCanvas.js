var canvas1 = document.getElementById('draggableCanvas'),
    context1 = canvas1.getContext('2d'),
    canvas2 = document.getElementById('draggableCanvas2'),
    context2 = canvas2.getContext('2d'),
    options = {
        alwaysDraggable: true,
        autoDrag: false
    };

// Canvas 1: Blue
DraggableCanvas.extend(canvas1);
canvas1.setSize(100, 100);
context1.fillStyle = 'rgba(128, 128, 223, 0.8)';
context1.fillRect(0, 0, 100, 100);
canvas1.style.position = 'absolute';
canvas1.style.top = '50px';
canvas1.style.left = '50px';
canvas1.onDrag(options, function (top, left, cursorX, cursorY) {
    canvas2.style.zIndex = 1;
    canvas1.style.zIndex = 2;

    var canvas2top = parseInt(canvas2.style.top),
        canvas2left = parseInt(canvas2.style.left);

    if (left + canvas1.width <= canvas2left || left >= canvas2left + canvas2.width) {
        canvas1.style.top = top + 'px';
        canvas1.style.left = left + 'px';
    } else {
        if (left + canvas1.width <= canvas2left + canvas2.width/2) {
            canvas1.style.left = canvas2left - canvas1.width + 'px';
        } else if (left >= canvas2left + canvas2.width/2) {
            canvas1.style.left = canvas2left + canvas2.width + 'px';
        }
        if (parseInt(canvas1.style.left) + canvas1.width <= canvas2left) {
            canvas1.style.top = top + 'px';
        } else if (parseInt(canvas1.style.left) >= canvas2left + canvas2.width) {
            canvas1.style.top = top + 'px';
        }
    }

    if (top + canvas1.height <= canvas2top || top >= canvas2top + canvas2.height) {
        canvas1.style.top = top + 'px';
        canvas1.style.left = left + 'px';
    } else {
        if (top + canvas1.height <= canvas2top + canvas2.height/2) {
            canvas1.style.top = canvas2top - canvas1.height + 'px';
        } else if (top >= canvas2top + canvas2.height/2) {
            canvas1.style.top = canvas2top + canvas2.height + 'px';
        }
        if (parseInt(canvas1.style.top) + canvas1.height <= canvas2top) {
            canvas1.style.left = left + 'px';
        } else if (parseInt(canvas1.style.top) >= canvas2top + canvas2.height) {
            canvas1.style.left = left + 'px';
        }
    }
});

// Canvas 2: Red
DraggableCanvas.extend(canvas2);
canvas2.setSize(100, 100);
context2.fillStyle = 'rgba(223, 128, 128, 0.8)';
context2.fillRect(0, 0, 100, 100);
canvas2.style.position = 'absolute';
canvas2.style.top = '200px';
canvas2.style.left = '200px';
canvas2.onDrag(options, function (top, left) {
    canvas1.style.zIndex = 1;
    canvas2.style.zIndex = 2;
});
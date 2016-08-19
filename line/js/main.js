var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
var width = window.innerWidth,
    height = window.innerHeight;
var start;
var midX = width / 2,
    midY = height / 2,
    x = midX,
    y = midY;

window.onload = function () {
    canvas.width = width;
    canvas.height = height;

    window.addEventListener('mousemove', onMouseMoved, false);
    window.addEventListener('touchmove', onTouchMoved, false);

    start = setInterval(draw, 15);
}

window.onresize = function () {

    ctx.save();

    width = window.innerWidth,
    height = window.innerHeight;
    midX = width / 2;
    midY = height / 2;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.restore();
}

var draw = function () {
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.moveTo(width, 0);
    ctx.lineTo(x, y);
    ctx.moveTo(width, height);
    ctx.lineTo(x, y);
    ctx.moveTo(0, height);
    ctx.lineTo(x, y);

    ctx.closePath();

    ctx.strokeStyle = '#F44336';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(midX, 0);
    ctx.lineTo(x, y);
    ctx.moveTo(width, midY);
    ctx.lineTo(x, y);
    ctx.moveTo(midX, height);
    ctx.lineTo(x, y);
    ctx.moveTo(0, midY);
    ctx.lineTo(x, y);

    ctx.closePath();

    ctx.strokeStyle = '#F44336';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(midX / 2, 0);
    ctx.lineTo(x, y);
    ctx.moveTo(midX + (midX / 2), 0);
    ctx.lineTo(x, y);
    ctx.moveTo(width, midY / 2);
    ctx.lineTo(x, y);
    ctx.moveTo(width, midY + (midY / 2));
    ctx.lineTo(x, y);
    ctx.moveTo(midX + (midX / 2), height);
    ctx.lineTo(x, y);
    ctx.moveTo(midX / 2, height);
    ctx.lineTo(x, y);
    ctx.moveTo(0, midY + (midY / 2));
    ctx.lineTo(x, y);
    ctx.moveTo(0, midY / 2);
    ctx.lineTo(x, y);

    ctx.closePath();

    ctx.strokeStyle = '#F44336';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 4;
    ctx.stroke();
}

var onMouseMoved = function (e) {
    x = e.clientX;
    y = e.clientY;
}

var onTouchMoved = function (e) {
    var touches = e.touches;
    x = touches[0].clientX;
    y = touches[0].clientY;

    e.preventDefault();
}
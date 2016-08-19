var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
var width = window.innerWidth,
    height = window.innerHeight;
var plots = [];
var active = false;
var color = '#212121',
    lineSize = 5;

window.addEventListener('mousedown', startDraw, false);
window.addEventListener('mousemove', draw, false);
window.addEventListener('mouseup', endDraw, false);
window.addEventListener('touchstart', startDraw, false);
window.addEventListener('touchmove', draw, false);
window.addEventListener('touchend', endDraw, false);

canvas.width = width;
canvas.height = height;

function startDraw(e) {
    active = true;
};

function draw(e) {
    if (e.target.className != "color") {
        if (e.type == "mousemove") {
            if (active) {
                var x = e.clientX;
                var y = e.clientY;

                plots.push({
                    x: x,
                    y: y
                });

                drawOnCanvas();
            };
        };
        if (e.type == "touchmove") {
            if (active) {
                touches = e.touches;
                var x = touches[0].clientX;
                var y = touches[0].clientY;

                plots.push({
                    x: x,
                    y: y
                });

                drawOnCanvas();
            };
            e.preventDefault();
        };
    };
};

function endDraw(e) {
    active = false;
    plots = [];
};

function drawOnCanvas() {
    ctx.beginPath();
    ctx.moveTo(plots[0].x, plots[0].y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (var i = 1; i < plots.length; i++) {
        ctx.lineTo(plots[i].x, plots[i].y);
        ctx.lineTo(plots[i].x + 1, plots[i].y + 1);
    };
    ctx.stroke();
};

var changeColor = function (hex) {
    color = hex;
};

var changeBackgroundColor = function () {
    var title = document.getElementById('title');
    canvas.style.backgroundColor = color;
    title.style.color = color;
};

var changeLineSize = function () {
    var inputEl = document.getElementById('input');
    var input = parseFloat(inputEl.innerHTML);
    lineSize = input;
};
var saveToImg = function () {
    Canvas2Image.saveAsPNG('canvas', canvas.width, canvas.height);
}
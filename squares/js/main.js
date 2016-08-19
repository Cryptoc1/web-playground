var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
var width = window.innerWidth,
    height = window.innerHeight;
var color0 = RandColor(),
    color1 = RandColor(),
    color2 = RandColor(),
    color3 = RandColor();

window.onload = function () {
    canvas.width = width;
    canvas.height = height;
    window.addEventListener('mousemove', draw, false);
}

window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

var draw = function (e) {
    var x = e.clientX;
    var y = e.clientY;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.fillRect(0, 0, x, y);
    ctx.fillStyle = color0;
    ctx.fillRect(0, y, x, height - y);
    ctx.fillStyle = color1;
    ctx.fillRect(x, 0, width - x, y);
    ctx.fillStyle = color2;
    ctx.fillRect(x, y, width - x, height - y);
    ctx.fillStyle = color3;

    ctx.fill();
}

function RandColor() {
    var hex = Number(Math.random()).toString(16);
    hex = "000000".substr(0, 6 - hex.length) + hex;
    var color = hex.substr(4);
    return '#' + color;
}
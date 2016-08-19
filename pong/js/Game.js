var Game = {};

Game.version = "0.0.1b";

Game.MakeRect = function (config) {
    ctx.fillStyle = config.color;
    ctx.fillRect(config.x, config.y, config.width, config.height);
    ctx.fill();
}

Game.MakeCircle = function (config) {
    ctx.fillStyle = config.color;
    ctx.beginPath();
    ctx.arc(config.x, config.y, config.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

Math.range = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(Game.version)
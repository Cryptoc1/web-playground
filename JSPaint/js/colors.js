var colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#212121', '#F5F5F5'];

var createPalette = function () {
    for (var i = 0; i < colors.length; i++) {
        var colorPalette = document.getElementById('colors')
        var color = document.createElement('div');
        color.className = 'color';
        color.setAttribute('onclick', 'changeColor(this.style.backgroundColor)');
        color.style.backgroundColor = colors[i];
        colorPalette.appendChild(color);
    };
};

var showPalette = function (el, directive) {
    if (directive == 'show') {
        var palette = document.getElementById('palette');
        var arrow = document.getElementById('arrowUp');
        el.style.display = 'none';
        palette.style.transition = 'top 1.5s';
        palette.style.top = 0;
        arrow.style.transform = "rotate(180deg)"
    };
    if (directive == 'hide') {
        var palette = document.getElementById('palette');
        var paletteButton = document.getElementById('paletteButton');
        var arrow = document.getElementById('arrowUp');
        palette.style.transition = 'top 1.5s';
        palette.style.top = -720;
        arrow.style.transform = "rotate(360deg)";
        paletteButton.style.display = 'inherit';
    };
}
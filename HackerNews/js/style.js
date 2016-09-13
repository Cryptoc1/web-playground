var width = window.innerWidth,
    height = window.innerHeight;

window.onload = function () {
    init();
    window.addEventListener('scroll', onScroll, false);
    checkCookie()
}
window.onresize = function () {
    init()
}

// Set things up
function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    document.getElementById('header').style.height = Math.round(height / 3.5);
    //        if (width > 800) {
    document.getElementById('buttons').style.top = Math.round(height / 3.5) - 35;
    //       }
    //    if (width < 800) {
    //        document.head.children[0].href = 'css/style-mobile.css';
    //        document.head.children[2].href = 'css/articles-mobile.css';
    //        document.head.children[3].href = 'css/buttons-mobile.css';
    //        var meta = document.createElement('meta');
    //        meta.name = 'viewport';
    //        meta.content = 'width=device-width, initial-scale=0.3, user-scalable=no';
    //        //     <meta name="viewport" content="width=device-width, initial-scale=0.3, user-scalable=no">
    //        //        document.head.appendChild(meta);
    //        document.getElementById('more').children[0].setAttribute('src', 'img/more-48.png');
    //        document.getElementById('more').setAttribute('onclick', 'moreMobile()');
    //        document.getElementById('info').children[0].setAttribute('src', 'img/info-48.png');
    //        document.getElementById('newSource').children[0].setAttribute('src', 'img/plus-48.png');
    //        document.getElementById('reload').children[0].setAttribute('src', 'img/sinchronize-48.png');
    //    }
    document.getElementById('title').style.marginTop = Math.round(height / 12);
    document.getElementById('newSourceMenu').style.top = (height / 2) - 200;
    document.getElementById('newSourceMenu').style.left = (width / 2) - 275;
    document.getElementById('infoMenu').style.top = (height / 2) - 200;
    document.getElementById('infoMenu').style.left = (width / 2) - 275;
}

// This is called 3 seconds after the Article Cards are created and displayed on the screen, it places the footer at the bottom of the page, kind of pointless since all the same info is in the infoMenu
function footer() {
    var bodContainer = document.getElementById('bodContainer');
    var footer = document.createElement('div');
    footer.id = 'footer';
    var year = new Date().getFullYear();
    if (year > 2014)
        var copy = "2014-" + year.toString();
    else
        var copy = "2014";
    footer.innerHTML = 'Credits: <a href="http://icons8.com/app" target="_blank">Icons8</a> <br> <a href="http://cryptocosm.x10.bz">A Cryptocosm Production</a> <br> &copy;' + copy;
    bodContainer.appendChild(footer);
}

// Header Effects
var height = window.innerHeight;
var header = document.getElementById('header'),
    title = document.getElementById('title'),
    buttons = document.getElementById('buttons');

// Handle the Scroll Event
function onScroll(e) {
    if (window.pageYOffset < 200)
        expandHeader();
    if (window.pageYOffset > 200)
        shrinkHeader();
}

// Make the header larger
function expandHeader() {
    if (width > 800) {
        title.style.transition = 'margin-top 1.5s';
        title.style.marginTop = '80px';
        title.style.fontSize = '38px';
        header.style.height = Math.round(height / 3.5);
        buttons.style.top = Math.round(height / 3.5) - 35;
    }
}

// Make the header thin
function shrinkHeader() {
    if (width > 800) {
        title.style.marginTop = '-5px';
        title.style.fontSize = '30px';
        header.style.height = Math.round(height * 0.1);
        buttons.style.top = Math.round(height * 0.1) - 35;
    }
}
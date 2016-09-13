// Button functions
function reload() {
    document.getElementById('reload').style.transform = 'rotate(270deg)';
    window.location.reload();
}

// Show me the menus!
function showMenu(btn) {
    var overlay = document.getElementById('overlay');
    switch (btn.attributes.menu.value) {
    case "newSourceMenu":
        overlay.style.display = "initial";
        document.getElementById('newSourceMenu').style.display = 'initial';
        document.getElementById('infoMenu').style.display = 'none';
        break;
    case "info":
        overlay.style.display = "initial";
        document.getElementById('newSourceMenu').style.display = 'none';
        document.getElementById('infoMenu').style.display = 'initial';
        break;
    }
}

// Control the submission of a new source
function newSource(source) {
    var input = source.parentNode.children[6].children[0].innerHTML;
    if (input == 'Source' || input == undefined || input == null || input == NaN) {
        window.alert("Error Loading Source: '" + input + "'");
    } else {
        subreddits.push(input);
        updateSources();
        closeSourceMenu(source.parentNode.children[0])
    }
}

// Close the current menu
function closeMenu(btn) {
    btn.parentNode.parentNode.style.display = "none";
}

// Animate the movement of the buttons
function more() {
    var moreButton = document.getElementById('more');
    var info = document.getElementById('info');
    var newSource = document.getElementById('newSource');
    var reload = document.getElementById('reload');
    if (moreButton.style.transform == 'rotate(90deg)') {
        moreButton.style.transform = 'rotate(0deg)';
        info.style.left = 64;
        info.style.boxShadow = '0 0 0 #BDBDBD';
        newSource.style.left = 129;
        newSource.style.boxShadow = '0 0 0 #BDBDBD';
        reload.style.left = 193;
        reload.style.boxShadow = '0 0 0 #BDBDBD';
    } else {
        moreButton.style.transform = 'rotate(90deg)';
        info.style.left = 0;
        info.style.boxShadow = '0px 2px 8px #BDBDBD';
        newSource.style.left = 0;
        newSource.style.boxShadow = '0px 2px 8px #BDBDBD';
        reload.style.left = 0;
        reload.style.boxShadow = '0px 2px 8px #BDBDBD';
    }
}

// Animate the movement of the buttons on a mobile device
function moreMobile() {
    var moreButton = document.getElementById('more');
    var info = document.getElementById('info');
    var newSource = document.getElementById('newSource');
    var reload = document.getElementById('reload');
    if (moreButton.style.transform == 'rotate(90deg)') {
        moreButton.style.transform = 'rotate(0deg)';
        info.style.left = 115;
        info.style.boxShadow = '0 0 0 #BDBDBD';
        newSource.style.left = 225;
        newSource.style.boxShadow = '0 0 0 #BDBDBD';
        reload.style.left = 346;
        reload.style.boxShadow = '0 0 0 #BDBDBD';
    } else {
        moreButton.style.transform = 'rotate(90deg)';
        info.style.left = 0;
        info.style.boxShadow = '0px 2px 8px #BDBDBD';
        newSource.style.left = 0;
        newSource.style.boxShadow = '0px 2px 8px #BDBDBD';
        reload.style.left = 0;
        reload.style.boxShadow = '0px 2px 8px #BDBDBD';
    }
}
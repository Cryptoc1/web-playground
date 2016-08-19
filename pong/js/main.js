var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    leftScoreEl = document.getElementById('leftScore'),
    rightScoreEl = document.getElementById('rightScore');
var width = window.innerWidth,
    height = window.innerHeight;
var leftPaddleY = (height / 2) - 75,
    rightPaddleY = (height / 2) - 75,
    posX = width / 2,
    posY = height / 2,
    velocityX = 7,
    velocityY = 3,
    rightPaddleV = 2;
var upKeyDown = false,
    downKeyDown = false;
var interval;
var leftScore = 0,
    rightScore = 0;
var touches = [];

window.onload = function () {
    canvas.width = width;
    canvas.height = height;

    interval = setInterval(draw, 10);

    window.addEventListener('keydown', keyPressed, false);
    window.addEventListener('keyup', keyReleased, false);
    window.addEventListener('mousemove', mouseMoved, false);
    window.addEventListener('touchmove', touchMove, false);
};

window.onresize = function () {
    canvas.width = width;
    canvas.height = height;
};

function draw() {

    ctx.clearRect(0, 0, width, height);

	ctx.beginPath();
	ctx.moveTo(width / 2, 0);
	for (i=0; i < height; i++) {
		ctx.lineTo(width / 2, i);
	}
	ctx.strokeStyle = "#00BFA5";
	ctx.closePath();
	ctx.stroke();

    /// Left Paddle
    Game.MakeRect({
        x: 20,
        y: leftPaddleY,
        width: 25,
        height: 150,
        color: "#304FFE"
    });

    /// Right Paddle
    Game.MakeRect({
        x: width - 40,
        y: rightPaddleY,
        width: 25,
        height: 150,
        color: "#304FFE"
    });
    /// Ball
    Game.MakeCircle({
        x: posX,
        y: posY,
        radius: 12,
        color: "#D50000"
    });

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.closePath();
    ctx.fill();

    if (posX + velocityX > width - 5) {
        leftScore = leftScore + 1;
        leftScoreEl.innerHTML = leftScore;
        velocityX = -velocityX - 0.5;
    }
    if (posY + velocityY > height || posY + velocityY < 0) {
        velocityY = -velocityY;
    }
    if (posX + velocityX < 60 && posY > leftPaddleY && posY < leftPaddleY + 150) {
        velocityX = -velocityX + 0.5;
    }
    if (posX > width - 60 && posY > rightPaddleY && posY < rightPaddleY + 150) {
        velocityX = -velocityX - 0.5;
    }
    if (posX + velocityX < 5) {
        rightScore = rightScore + 1;
        rightScoreEl.innerHTML = rightScore;
        velocityX = -velocityX + 0.5;
    }

    posX += velocityX;
    posY += velocityY;
  
	 if (posY < rightPaddleY) {
		rightPaddleV = -rightPaddleV;
	} 
	if (posY > rightPaddleY + 150) {
		rightPaddleV = -rightPaddleV;
	}
	if (rightPaddleY > height - 150) {
		rightPaddleV = -rightPaddleV;
	}
	if (rightPaddleY < 0) {
		rightPaddleV = -rightPaddleV;
	}
	
	rightPaddleY += rightPaddleV;

    if (upKeyDown) {
        if (leftPaddleY - 10 < 0) {
            leftPaddleY = 0;
        } else {
            leftPaddleY -= 10;
        }
    }
    if (downKeyDown) {
        if (leftPaddleY + 10 > height - 150) {
            leftPaddleY = height - 150;
        } else {
            leftPaddleY += 10;
        }
    }
    
    if (leftScore == 10 || rightScore == 10) {
    	if (leftScore > rightScore) {
    		clearInterval(interval)
    		alert('Left wins!');
    	}
    	if (rightScore > leftScore) {
    		clearInterval(interval)
    		alert('Right wins!');
    	}
    }
};

var keyPressed = function (e) {
    var keyCode = e.which;
    switch (keyCode) {
        /// Up key
    case 38:
        upKeyDown = true;
        break;
        /// Down key
    case 40:
        downKeyDown = true;
        break;
    };
};
var keyReleased = function (e) {
    var keyCode = e.which;
    switch (keyCode) {
        /// Up key
    case 38:
        upKeyDown = false;
        break;
        /// Down key
    case 40:
        downKeyDown = false;
        break;
    };
};

var mouseMoved = function (e) {
    leftPaddleY = e.clientY - 75;
};

var touchMove = function (e) {
	touches = e.touches;
	if (touches.length > 1) {
		if (touches[0].clientX < width / 2) {
			leftPaddleY = touches[0].clientY - 75;
			rightPaddleY = touches[1].clientY - 75;
		}
		if (touches[0].clientX > width / 2) {
			rightPaddelY = touches[0].clientY - 75;
			leftPaddleY = touches[1].clieantY - 75;
		}
	}
	 else {
		leftPaddleY = touches[0].clientY - 75;
	}
	e.preventDefault();
};
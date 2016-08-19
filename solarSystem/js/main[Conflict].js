//Initiate the render context
var elem = document.getElementById('canvas');
var two = new Two({
    fullscreen: true
}).appendTo(elem);

//Define our planets and their colors
var sun = two.makeCircle(0, 0, 70);
var mercury = two.makeCircle(95, 0, 7);
var venus = two.makeCircle(130, 0, 10);
var earth = two.makeCircle(170, 0, 11.4);
var mars = two.makeCircle(200, 0, 8.3);
var jupiter = two.makeCircle(260, 0, 28);

//For Saturn we're going to do something special in order to get the rings
var saturnBody = two.makeCircle(320, 0, 24);
var saturnRings = two.makeCurve(296, 0, 290, 10, 322, 10, 350, -8, 342, -10, true);
var saturn = two.makeGroup(saturnBody, saturnRings);
var uranus = two.makeCircle(460, 0, 18);
var neptune = two.makeCircle(540, 0, 16);
var asteroid = two.makeCircle(320, 900, 3);

//Try to make some stars
//var randInt = Math.round(Math.random() * 1000);

var width = window.innerWidth;
var height = window.innerHeight;
var star;
for (i = 0; i < 700; i++) {
    var randX = Math.round(Math.random() * width);
    var randY = Math.round(Math.random() * height);
    star = two.makeCircle(randX, randY, 2);
}
sun.fill = '#F7CA18';
mercury.fill = '#9E9E9E';
venus.fill = '#795548';
earth.fill = '#2196F3';
mars.fill = '#FF7043';
jupiter.fill = '#E67E22';
saturnBody.fill = '#A1887F';
saturnRings.stroke = "#F5F5F5";
saturnRings.linewidth = 4;
saturnRings.noFill();
saturn.translation.set(20, 0);
uranus.fill = '#4DB6AC';
neptune.fill = '#3F51B5';
star.fill = '#FAFAFA';
asteroid.fill = '#FAFAFA';

//Group all the planets together
var planets = two.makeGroup(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);
var asteroids = two.makeGroup(asteroid);

//Center everything in the center of the element
planets.translation.set(two.width / 2, two.height / 2);


asteroids.translateX += -.03;


// Bind a function to scale and rotate the group to the animation loop.
two.bind('update', function (frameCount) {
    // This code is called everytime two.update() is called. Effectively 60 times per second.

    //Set the "ZOOM" of the system
    planets.scale = .66;
    //Rotate all the planets (for now they rotate together)
    planets.rotation += .01;
    //Rotate Saturn's rings so that it doesn't look dumb
    saturnRings.rotation += -.01;

}).play(); // Finally, start the animation loop
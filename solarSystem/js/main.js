//Initiate the render context
var elem = document.getElementById('canvas');
var two = new Two({
    fullscreen: true
}).appendTo(elem);

//Define our planets and their colors
var sun = two.makeCircle(0, 0, 70);
var mercury = two.makeCircle(85, 0, 7);
var venus = two.makeCircle(135, 0, 10);
var earth = two.makeCircle(170, 0, 11.4);
var mars = two.makeCircle(200, 0, 8.3);
var jupiter = two.makeCircle(260, 0, 28);
//      For Saturn we're going to do something special in order to get the rings
var saturnBody = two.makeCircle(320, 0, 24);
var saturnRings = two.makeCurve(296, 0, 290, 10, 322, 10, 350, -8, 342, -10, true);
saturnRings.rotation = 4.5;
var saturn = two.makeGroup(saturnBody, saturnRings);
var uranus = two.makeCircle(460, 0, 18);
var neptune = two.makeCircle(540, 0, 16);
var asteroid = two.makeCircle(0, 320, 3);

//Try to make some stars
var width = window.innerWidth;
var height = window.innerHeight;
var star;
for (i = 0; i < 200; i++) {
    var randX = Math.round(Math.random() * width);
    var randY = Math.round(Math.random() * height);
    star = two.makeCircle(randX, randY, 2);
}
//Set the color of the planets
sun.fill = '#F7CA18';
mercury.fill = '#9E9E9E';
venus.fill = '#795548';
earth.fill = '#2196F3';
mars.fill = '#FF7043';
jupiter.fill = '#E67E22';
saturnBody.fill = '#A1887F';
saturnRings.stroke = "#F5F5F5";
saturnRings.linewidth = 7;
saturnRings.noFill();
saturn.translation.set(20, 0);
uranus.fill = '#4DB6AC';
neptune.fill = '#3F51B5';
star.fill = '#FAFAFA';
asteroid.fill = '#FAFAFA';

//Group the planets
var Mercury = two.makeGroup(mercury);
var Venus = two.makeGroup(venus);
var Earth = two.makeGroup(earth);
var Mars = two.makeGroup(mars);
var Jupiter = two.makeGroup(jupiter);
var Saturn = two.makeGroup(saturn);
var Uranus = two.makeGroup(uranus);
var Neptune = two.makeGroup(neptune);
var planets = two.makeGroup(sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune);

//Center everything in the center of the element
planets.translation.set(two.width / 2, two.height / 2);
Mercury.rotation = 4;
Venus.rotation = 2.5;
Earth.rotation = 5.5;
Mars.rotation = 1;
Jupiter.rotation = 4.2;
Saturn.rotation = 2.5;
Uranus.rotation = 5.75;
Neptune.rotation = .5;

var counter = document.getElementById('counter');
var count = 0;
var yearsPassed = 0;
// Bind a function to scale and rotate the group to the animation loop.
two.bind('update', function (frameCount) {
    //Set the "ZOOM" of the system
    planets.scale = .8;

    //Rotate all the planets
    //Rotate all the planets
    Mercury.rotation += .01607;
    Venus.rotation += .01174;
    Earth.rotation += .01;
    count++;
    if (count % 550 == 0) {
        yearsPassed++;
        counter.innerHTML = "An estimated " + yearsPassed + " Earth years passed";
    };
    Mars.rotation += .00802;
    Jupiter.rotation += .00434;
    Saturn.rotation += .00323;
    Uranus.rotation += .00228;
    Neptune.rotation += .00182;

    //Rotate Saturn's rings so that it doesn't look dumb
    saturnRings.rotation -= .00323;
}).play(); // Finally, start the animation loop


two.update();
sun._renderer.elem.addEventListener('mouseover', sunMenu, false);
Mercury._renderer.elem.addEventListener('mouseover', mercuryMenu, false);
Venus._renderer.elem.addEventListener('mouseover', venusMenu, false);
Earth._renderer.elem.addEventListener('mouseover', earthMenu, false);
Mars._renderer.elem.addEventListener('mouseover', marsMenu, false);
Jupiter._renderer.elem.addEventListener('mouseover', jupiterMenu, false);
Saturn._renderer.elem.addEventListener('mouseover', saturnMenu, false);
Uranus._renderer.elem.addEventListener('mouseover', uranusMenu, false);
Neptune._renderer.elem.addEventListener('mouseover', neptuneMenu, false);

var menu = document.getElementById('menu');

function sunMenu() {
    menu.innerHTML = "<h1>The Sun</h1><p>The Sun isn't really a planet; it's a star. Stars are made up of tons of burning gasses that are packed into a big ball. The Sun is big enough to fit over 1 million Earths inside of it! The Sun may be the biggest thing in our solar system, but there are billions of stars way bigger than our's! The temperature on the Sun is about 10,000&deg;F. The gravity of this big, flaming gas ball is what keeps it together and what keeps the planets orbiting around it.</p>";
}

function mercuryMenu() {
    menu.innerHTML = "<h1>Mercury</h1><p>Mercury is the closest planet to the Sun and the smallest planet in the solar system. Even though it's closest to the Sun, it's the second hottest planet. Mercury looks like our Moon, because there's nothing but dust and craters. Mercury doesn't have any moons of its own. It has a new year every 88 Earth days, but has new day every 58 Earth days. So on Mercury, one year is less than two days!</p>";
}

function venusMenu() {
    menu.innerHTML = "<h1>Venus</h1><p>Venus is the second planet from the Sun. It rotates backwards, so mornings are like afternoons, and afternoons are like mornings. Basically, the Sun sets and rises in opposite directions of what it does here on Earth. It takes Venus 225 Earth days to have one year, or orbit around the Sun. One day on Venus is equal to about 117 Earth days. Venus also doesn't have any moons.</p>";
}

function earthMenu() {
    menu.innerHTML = "<h1>Earth</h1><p>Earth is the third planet from the Sun. As you probably already know, we live here! This is the only planet in the entire universe that we know has living things on it. That's because we're the only planet that we know of that has flowing water, and water is needed for living things to stay alive. Our orbit around the Sun lasts 365 days. We only have one moon, and it's the only moon that humans have ever been on.</p>";
}

function marsMenu() {
    menu.innerHTML = "<h1>Mars</h1><p>Mars is the fourth planet from the Sun. Its day is only 40 minutes longer than ours, but its year takes almost twice as long! Mars is only a little bit bigger than Earth. It has the tallest mountain in the solar system - about three times higher than Mount Everest! It also has two moons. Mars is the only planet in our solar system that we have robots on. These robots are called 'Rovers'</p>";
}

function jupiterMenu() {
    menu.innerHTML = "<h1>Jupiter</h1><p>Jupiter is the fifth planet from the Sun. It's the biggest planet in the solar system! One day on Jupiter only lasts 9 hours, but one year lasts almost 12 Earth years. It's called a 'gas giant' because it's made almost completely out of gas. Jupiter has a whopping 67 moons! The Great Red Spot is a giant storm on Jupiter that's lasted for hundreds of years and is about the size of 3 Earths.</p>";
}

function saturnMenu() {
    menu.innerHTML = "<h1>Saturn</h1><p>Saturn is the sixth planet from the Sun. Its day lasts almost 11 hours and its year takes almost 30 Earth years. It's also a gas giant, like Jupiter. Saturn is popular for its big rings, which are made of dust, ice, and rock. It has over 30 rings! Saturn is also popular for its moons. It has 62 moons, but one of them, Titan, is very popular. Some people think that Titan may have life on it.</p>";
}

function uranusMenu() {
    menu.innerHTML = "<h1>Uranus</h1><p>Uranus is the seventh planet from the Sun. It's also the coldest planet in the solar system - its highest temperature is in the negatives! Its day lasts just over 17 hours and its year takes about 84 Earth years. So in the average person's lifetime, you'd only live for about one year on Uranus! Uranus has 27 moons, and it rotates backwards like Venus does. It has 13 rings like Saturn's, but they're very hard to see.</p>";
}

function neptuneMenu() {
    menu.innerHTML = "<h1>Neptune</h1><p>Neptune is the eighth and last planet in the solar sytem (Pluto was last, but it's called a 'dwarf planet' now). Its day lasts just over 16 hours and its year lasts 165 Earth years. Neptune has very high speed winds and very thin rings made of dust and ice. It's a little smaller than Uranus, but it's more packed in. The gasses in Neptune's air make the planet look blue. It also has a big storm called The Great Dark Spot.</p>";
}
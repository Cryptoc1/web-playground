var width = window.innerWidth,
    height = window.innerHeight,
    goldenRatio = (width + height) / 2;
var scene, camera, controls, renderer;

init();
render();

function animate() {
    requestAnimationFrame(animate);
    controls.update();

};


function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    camera = new THREE.PerspectiveCamera(75, width / height, .01, width);
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x181818);
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera);
    controls.damping = 1;
    controls.addEventListener('change', render);

    makeLights();
    generateStarFeild();
};


function makeLights() {
    var ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xE0E0E0, 0.8);
    pointLight.position.set(30, 400, 100);
    this.scene.add(pointLight);
};


function generateStarFeild() {
    for (i = 0; i < 5000; i++) {
        var randX = getRandomInt(-width, width);
        var randY = getRandomInt(-height, height);
        var randZ = getRandomInt(-goldenRatio, goldenRatio);

        makeStar(randX, randY, randZ);
    };
};


function makeStar(X, Y, Z) {
    var geometry = new THREE.SphereGeometry(4, 5, 3);
    var material = new THREE.MeshNormalMaterial({
        color: 0xECEFF1,
        shading: THREE.FlatShading
    });

    geometry.dynamic = true;
    geometry.normalsNeedUpdate = true;

    var star = new THREE.Mesh(geometry, material);

    star.position.x = X;
    star.position.y = Y;
    star.position.z = Z;
    scene.add(star);
};


function render() {
    renderer.render(scene, camera);
};


function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min + 1)) + min;
};
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
    audio: false,
    video: {
        mandatory: {
            maxWidth: 540,
            maxHeight: 300
        }
    }
};
var video = document.querySelector("video");

function successCallback(stream) {
    window.stream = stream; // stream available to console
    if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
    } else {
        video.src = stream;
    }
}

function errorCallback(error) {
    console.log("navigator.getUserMedia error: ", error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);


/////////////////////////////////////////////////////////////////////

var texture, scene, camera, renderer, image, imageContext;

init();
animate();


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render()
};


function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera);
    controls.damping = 1;
    controls.addEventListener('change', render);

    var geometry = new THREE.SphereGeometry(100, 640, 360);
    image = document.createElement('canvas');
    image.width = 480;
    image.height = 204;

    imageContext = image.getContext('2d');
    imageContext.fillStyle = '#000000';
    imageContext.fillRect(0, 0, 480, 204);

    texture = new THREE.Texture(image);
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        overdraw: 0.5
    });

    var sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    camera.position.z = 500;
};


function render() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {

        imageContext.drawImage(video, 0, 0);

        if (texture) texture.needsUpdate = true;
    };
    renderer.render(scene, camera);
};
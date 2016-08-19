var camera, scene, renderer, light;
var geometry, material, mesh, texture;
var keyDoor, Bot;
var controls;

var floor = [],
    ceiling = [];

var raycaster;

var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');

///////////////////////////////////////////////////////////////////////////////////////
// Initiate the PointerLock API      
///////////////////////////////////


var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {

    var element = document.body;

    var pointerlockchange = function (event) {

        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

            controls.enabled = true;

            blocker.style.display = 'none';

        } else {

            controls.enabled = false;

            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';

            instructions.style.display = '';

        }

    }

    var pointerlockerror = function (event) {

        instructions.style.display = '';

    }

    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    instructions.addEventListener('click', function (event) {

        instructions.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        if (/Firefox/i.test(navigator.userAgent)) {

            var fullscreenchange = function (event) {

                if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

                    document.removeEventListener('fullscreenchange', fullscreenchange);
                    document.removeEventListener('mozfullscreenchange', fullscreenchange);

                    element.requestPointerLock();
                }

            }

            document.addEventListener('fullscreenchange', fullscreenchange, false);
            document.addEventListener('mozfullscreenchange', fullscreenchange, false);

            element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

            element.requestFullscreen();

        } else {

            element.requestPointerLock();

        }

    }, false);

} else {

    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

/////////////////////////////
// End PointerLock API
//////////////////////////////////////////////////////////////////////////////////////

init();
animate();
derender();

function init() {

    camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);

    scene = new THREE.Scene();

    //    camera.position.z = 100;

    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    /////////////////////////////
    // Floor
    ///////////

    geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    for (var i = 0, l = geometry.vertices.length; i < l; i++) {

        var vertex = geometry.vertices[i];
        //        vertex.x += Math.random() * 20 - 10;
        //        vertex.y += Math.random() * 2;
        //        vertex.z += Math.random() * 20 - 10;
        vertex.x += 0;
        vertex.y += 0;
        vertex.z += 0;

    }

    material = new THREE.MeshNormalMaterial({
        color: 0xBDBDBD,
        //        map: texture,
        shading: THREE.FlatShading
    });

    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    floor.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(20, 5, 55);
    material = new THREE.MeshNormalMaterial({
        color: 0xEEEEEE,
        shading: THREE.FlatShading
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -59;

    scene.add(mesh)

    floor.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(55, 5, 20);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -76.5;
    mesh.position.x = -37.5;

    scene.add(mesh)

    floor.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(50, 5, 30);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -71.5;
    mesh.position.x = -90;

    scene.add(mesh)

    floor.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(20, 5, 30);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -41.5;
    mesh.position.x = -104;

    scene.add(mesh)

    floor.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(68, 5, 27);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -100;
    mesh.position.x = -81;

    scene.add(mesh)

    floor.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(20, 5, 15);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -120.5;
    mesh.position.x = -93;

    scene.add(mesh)

    floor.push(mesh);


    ///////////////////////////////////////////////
    // Construct the walls
    /////////////////////////

    texture = THREE.ImageUtils.loadTexture("img/brick.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    material = new THREE.MeshNormalMaterial({
        color: 0x757575,
        //        map: texture,
        shading: THREE.FlatShading
    });

    geometry = new THREE.BoxGeometry(60, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 30;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 55, 60);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 0;
    mesh.position.x = -30;

    scene.add(mesh);
    meshes.push(mesh);


    //////

    geometry = new THREE.BoxGeometry(3, 55, 60);


    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 0;
    mesh.position.x = 30;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(20, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -30;
    mesh.position.x = -20;

    scene.add(mesh);
    meshes.push(mesh);


    //////

    geometry = new THREE.BoxGeometry(20, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -30;
    mesh.position.x = 20;

    scene.add(mesh);
    meshes.push(mesh);


    //////

    geometry = new THREE.BoxGeometry(3, 55, 55);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -59;
    mesh.position.x = 11.5;

    scene.add(mesh);
    meshes.push(mesh);


    //////

    geometry = new THREE.BoxGeometry(3, 55, 35);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -49;
    mesh.position.x = -11.5;

    scene.add(mesh);
    meshes.push(mesh);


    //////

    geometry = new THREE.BoxGeometry(58, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -88;
    mesh.position.x = -16;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(52, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -65;
    mesh.position.x = -39;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 55, 10);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -68.5;
    mesh.position.x = -66.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(25, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -72;
    mesh.position.x = -80;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 55, 50);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -48.5;
    mesh.position.x = -92.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 55, 30);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -101.5;
    mesh.position.x = -46.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(35, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -115;
    mesh.position.x = -65.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 55, 95);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -30;
    mesh.position.x = -115.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(50, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 16;
    mesh.position.x = -89;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 55, 40);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -2.5;
    mesh.position.x = -62.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(33, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -23.5;
    mesh.position.x = -77.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 55, 15);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -109;
    mesh.position.x = -115.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 15, 24);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -89.5;
    mesh.position.x = -115.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 7.5, 24);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 23.75;
    mesh.position.z = -89.5;
    mesh.position.x = -115.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 12.5, 5.75);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 13.75;
    mesh.position.z = -80;
    mesh.position.x = -115.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 12.5, 5.75);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 13.75;
    mesh.position.z = -98.75;
    mesh.position.x = -115.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(2, 13, 14);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 14;
    mesh.position.z = -89;
    mesh.position.x = -124;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(13, 2, 14);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 6.5;
    mesh.position.z = -89;
    mesh.position.x = -123;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(13, 2, 14);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 21;
    mesh.position.z = -89;
    mesh.position.x = -123;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(7, 13, 2);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 14;
    mesh.position.z = -96.75;
    mesh.position.x = -120;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(7, 13, 2);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 14;
    mesh.position.z = -81.75;
    mesh.position.x = -120;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(11, 55, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -115;
    mesh.position.x = -108.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 55, 30);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -130;
    mesh.position.x = -104.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 55, 30);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -130;
    mesh.position.x = -81.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 40, 70);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -165;
    mesh.position.x = -104.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 40, 50);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -155;
    mesh.position.x = -81.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(95, 40, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -178.5;
    mesh.position.x = -32.5;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(120, 40, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -201.5;
    mesh.position.x = -45;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 100, 50);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -152;
    mesh.position.x = 13;
    mesh.rotation.z = -0.3;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 30, 26);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -190;
    mesh.position.y = 33.5;
    mesh.position.x = 23.375;
    mesh.rotation.z = -0.3;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 100, 50);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -228;
    mesh.position.x = 13;
    mesh.rotation.z = -0.3;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(63, 100, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -128;
    mesh.position.x = 43.5;
    mesh.rotation.x = -0.3;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(63, 100, 3);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -250;
    mesh.position.x = 43.5;
    mesh.rotation.x = 0.3;

    scene.add(mesh);
    meshes.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(3, 100, 126);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -189;
    mesh.position.x = 74;
    mesh.rotation.z = 0.3;

    scene.add(mesh);
    meshes.push(mesh);

    //////////////////////////////////////////////////
    // Ceilings
    //////////////

    material = new THREE.MeshNormalMaterial({
        color: 0x9E9E9E,
        //        map: texture,
        shading: THREE.FlatShading
    });

    geometry = new THREE.BoxGeometry(36, 3, 96);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -189;
    mesh.position.x = 43.5;
    mesh.position.y = 46;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(124, 3, 26);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -190;
    mesh.position.x = -44;
    mesh.position.y = 21.5;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(26, 10, 32);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -161;
    mesh.position.x = -93;
    mesh.position.y = 25;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(26, 3, 32);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -129;
    mesh.position.x = -93;
    mesh.position.y = 29;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(72, 3, 53);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -90;
    mesh.position.x = -83;
    mesh.position.y = 29;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(60, 3, 26);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -76;
    mesh.position.x = -20;
    mesh.position.y = 29;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(26, 3, 45);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -41;
    mesh.position.x = 0;
    mesh.position.y = 29;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(60, 3, 60);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 0;
    mesh.position.x = 0;
    mesh.position.y = 29;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(60, 3, 60);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 0;
    mesh.position.x = 0;
    mesh.position.y = 29;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(26, 3, 80);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -25;
    mesh.position.x = -104;
    mesh.position.y = 29;

    scene.add(mesh);
    ceiling.push(mesh);

    //////

    geometry = new THREE.BoxGeometry(35, 3, 43);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -5;
    mesh.position.x = -74;
    mesh.position.y = 29;

    scene.add(mesh);
    ceiling.push(mesh);

    ///////////////////////////////////////////////////////////////////////////////////
    // Advanced Scene construction (Lights, and More Effects)
    ///////////////////////////////////////////////////////////

    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    //////

    light = new THREE.HemisphereLight(0x9E9E9E, 0xCFD8DC, 0.5);
    light.position.set(0.5, 1, 0.75);

    scene.add(light);

    //////

    var color = 0xFF6F00;
    var lightDistance = 100;

    //////
    light = new THREE.PointLight(color, 1, lightDistance);
    light.position.set(25.5, 5, -138);

    scene.add(light);

    //////

    light = new THREE.PointLight(color, 1, lightDistance);
    light.position.set(61.5, 5, -138);

    scene.add(light);

    //////

    light = new THREE.PointLight(color, 1, lightDistance);
    light.position.set(25.5, 5, -240);

    scene.add(light);

    //////

    light = new THREE.PointLight(color, 1, lightDistance);
    light.position.set(61.5, 5, -240);

    scene.add(light);

    //////

    light = new THREE.PointLight(0x03A9F4, 2, 15);
    light.position.set(-120, 8, -89);

    scene.add(light);

    //////

    light = new THREE.PointLight(0xFFD54F, 1, 100);
    light.position.set(7, 25, -84);

    scene.add(light);

    ///////////////////////////////////////////////////////
    // Doors and stuff
    /////////////////////

    geometry = new THREE.BoxGeometry(2, 13, 14);

    material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    keyDoor = new THREE.Mesh(geometry, material);
    keyDoor.position.y = 14;
    keyDoor.position.z = -89;
    keyDoor.position.x = -114;

    scene.add(keyDoor);
    meshes.push(keyDoor);

    /////////////////////////////////////////////////////
    // Build the BotGaurds
    /////////////////////////

    Bot = new DOM.M1Bot();

    scene.add(Bot);

    Bot.position.x = 0;
    Bot.position.y = 10;
    Bot.position.z = 0;

    /////////////////////////////////////////////////
    // Initiate the Renderer
    //////////////////////////

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0x616161);
    renderer.setSize(width, height);

    document.body.appendChild(renderer.domElement);

    //

    window.addEventListener('resize', onWindowResize, false);

    //

    appendMeshes();
};

function onWindowResize() {

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

};

function animate() {

    requestAnimationFrame(animate);

    controls.isOnObject(false);

    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    var intersections = raycaster.intersectObjects(floor);

    if (intersections.length > 0) {

        controls.isOnObject(true);

    }

    controls.update();

    renderer.render(scene, camera);

};

function appendMeshes() {
    for (i = 0; i < floor.length; i++) {
        meshes.push(floor[i]);
    }
    for (i = 0; i < ceiling.length; i++) {
        meshes.push(ceiling[i]);
    }
};

function derender() {
    window.onunload = function () {
        DOM.Derender({
            level: "M1Bot Model"
        });
        return " ";
    }
}
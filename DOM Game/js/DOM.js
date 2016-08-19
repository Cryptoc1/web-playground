/*******************

    A library for a game called DOM,
    a DOOM like game.
    
    -/-- Samuel Steele
    
        *****************************/

var width = window.innerWidth,
    height = window.innerHeight,
    meshes = [];

var DOM = {};

DOM.Version = "0.0.1b"


/// This is the constructor for the Model One BotGaurd.
DOM.M1Bot = function (config) {


    /// Construct the acctually BotGaurd
    var DOMGeometry, DOMMaterial;
    var lowerBody, upperBody, body;

    body = new THREE.Object3D();
    this.arms = new THREE.Object3D();
    this.M1Bot = new THREE.Object3D();

    DOMMaterial = new THREE.MeshNormalMaterial({
        color: 0xF44336,
        shading: THREE.FlatShading
    });

    DOMGeometry = new THREE.CylinderGeometry(5, 3.125, 2.5, 4);
    lowerBody = new THREE.Mesh(DOMGeometry, DOMMaterial);
    lowerBody.position.y = -7.5;

    meshes.push(lowerBody);
    body.add(lowerBody);


    DOMGeometry = new THREE.CylinderGeometry(2.5, 5, 5, 4);
    upperBody = new THREE.Mesh(DOMGeometry, DOMMaterial);
    upperBody.position.y = -3.75;

    meshes.push(upperBody);
    body.add(upperBody);

    body.rotation.y = -2.35;


    this.M1Bot.add(body);


    DOMGeometry = new THREE.CylinderGeometry(1.5, 2.75, 2.5, 4);
    this.head = new THREE.Mesh(DOMGeometry, DOMMaterial);

    this.head.position.y = .25;
    this.head.rotation.y = -2.35;

    meshes.push(this.head);
    this.M1Bot.add(this.head);


    DOMGeometry = new THREE.BoxGeometry(.375, .75, 5);
    this.rightArm = new THREE.Mesh(DOMGeometry, DOMMaterial);

    this.rightArm.position.x = 3;
    this.rightArm.position.y = -3;

    meshes.push(this.rightArm);
    this.arms.add(this.rightArm);


    DOMGeometry = new THREE.BoxGeometry(.375, .75, 5);
    this.leftArm = new THREE.Mesh(DOMGeometry, DOMMaterial);

    this.leftArm.position.x = -3;
    this.leftArm.position.y = -3;

    meshes.push(this.leftArm);
    this.arms.add(this.leftArm);

    this.arms.position.z = 1.75;

    this.M1Bot.add(this.arms);

    this.M1Bot.position.set(0, 0, 0);

    /// Below we'll define the M1BotGaurd's methods like shoot, die, etc..
    this.shoot = function () {
        var bulletGeometry = new THREE.BoxGeometry(.375, .375, .375);
        var bullet = new THREE.Mesh(bulletGeometry, DOMMaterial);
        bullet.position.set(this.M1Bot.position.x, this.M1Bot.position.y, this.M1Bot.position.z);

        return bullet;
    };


    return this.M1Bot;
};

/***
    Below is the Derender function.
        When the user closes, or refreshes
        the page this function is called to 
        deconstruct the scene, to clean up
        the GPU/Memory.
                                        ***/

DOM.Derender = function (config) {
    switch (config.level) {
    case "M1BotModel":
        for (i = 0; i < meshes.length; i++) {
            meshes[i].geometry.dispose();
            meshes[i].material.dispose();
            scene.remove(meshes[i])
        };
        break;
    case 1:
        for (i = 0; i < meshes.length; i++) {
            meshes[i].geometry.dispose();
            meshes[i].material.dispose();
            scene.remove(meshes[i]);
        };
        break;
    }
};


/// Log the current version of this Library
console.log("DOM Version: " + DOM.Version);
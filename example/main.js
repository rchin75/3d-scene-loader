import createScene from "./../src/scene";

/*
 * Note: the model and skybox paths are relative to this file.
 * Webpack is configured to work correctly with these paths, see example.webpack.config.js.
 * For some reason Webpack Dev Server works with both './../models' and well as just 'models'. Not sure why.
 * But to run directly from the dist-example folder you need './../models'.
 *
 * Run with npm run serve.
 */
const canvasID = null;//'canvas';
const config = {
    backgroundColor: 0xAACCFF,
    models: [
        {
            name: 'terrain',
            file: './../models/ground/ground.gltf',
            position: [0,0,0],
            scale: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            animate: false,
            clickable: false
        },
        {
            name: 'windmill01',
            file: './../models/windmill/windmill01.gltf',
            position: [0,0,0],
            scale: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            animate: true,
            clickable: true
        },
        {
            name: 'windmill02',
            file: './../models/windmill/windmill01.gltf',
            position: [5,0,0],
            scale: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            animate: true,
            clickable: true
        },
        {
            name: "windmill03",
            file: './../models/windmill/windmill01.gltf',
            position: [-5,0,1],
            scale: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            animate: true,
            clickable: true
        },
    ],
    ambientLight: {
        color: 0xFFFFFF,
        intensity: 0.8
    },
    directionalLights: [
        {
            color: 0xFFFFFF,
            intensity: 0.8,
            position: [150,200,130],
            target: [0,0,0],
        }
    ],
    skybox: {
        size: 10000,
        folder: './../skyboxes/SimpleSky/',
        frontSide: 'front.jpg',
        backSide: 'back.jpg',
        upSide: 'top.jpg',
        downSide: 'bottom.jpg',
        rightSide: 'right.jpg',
        leftSide: 'left.jpg'
    },
    floor: {
        color: 0x00FF00,
        size: 10000,
        level: -0.1
    },
    camera: {
        position: [0,0,30],
        near: 0.1,
        far: 10000
    },
    axis: true
}

function onClick(event) {
    console.log("You clicked on: " + event.name);
}

createScene(config, {canvasID, onClick});

// Hide the canvas if it is not used to render the scene.
if (!canvasID) {
    let canvas = document.getElementById( 'canvas' );
    canvas.style.display = 'none';
}


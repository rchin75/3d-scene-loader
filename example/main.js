import createScene from "./../src/scene";

/*
 * Note: the model and skybox paths are relative to this file.
 * Webpack is configured to work correctly with these paths, see example.webpack.config.js.
 * For some reason Webpack Dev Server works with both './../models' and well as just 'models'. Not sure why.
 * But to run directly from the dist-example folder you need './../models'.
 *
 * Run with npm run serve.
 */

const config = {
    //canvasID : 'canvas',
    backgroundColor: 0xFFFFFF,
    models: [
        {
            file: './../models/medieval_house/scene.gltf',
            position: [0,0,0],
            scale: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0
        }
    ],
    ambientLight: {
        color: 0xFFFFFF,
        intensity: 0.5
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
        folder: './../skyboxes/Daylight Box_Pieces/',
        frontSide: 'Daylight Box_Front.bmp',
        backSide: 'Daylight Box_Back.bmp',
        upSide: 'Daylight Box_Top.bmp',
        downSide: 'Daylight Box_Bottom.bmp',
        rightSide: 'Daylight Box_Right.bmp',
        leftSide: 'Daylight Box_Left.bmp'
    },
    floor: {
        color: 0x00FF00,
        size: 10000
    },
    camera: {
        position: [0,0,30],
        near: 0.1,
        far: 10000
    },
    axis: true
}

createScene(config);

// Hide the canvas if it is not used to render the scene.
if (!config.canvasID) {
    let canvas = document.getElementById( 'canvas' );
    canvas.style.display = "none";
}

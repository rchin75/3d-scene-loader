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
    backgroundColor: 0xAACCFF,
    models: [
        {
            file: './../models/ground/ground.gltf',
            position: [0,0,0],
            scale: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            animate: false
        },
        {
            file: './../models/windmill/windmill01.gltf',
            position: [0,0,0],
            scale: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            animate: true
        },
        {
            file: './../models/windmill/windmill01.gltf',
            position: [5,0,0],
            scale: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            animate: true
        },
        {
            file: './../models/windmill/windmill01.gltf',
            position: [-5,0,1],
            scale: 0.5,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            animate: true
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

createScene(config, onProgress);

/**
 * Displays the loading progress.
 * @param progress Progress object.
 */
function onProgress(progress) {
    const progressPercentage = (progress.percentage * 100) + "%";

    // Updates the progress bar.
    const progressBar = document.getElementById( 'progressBarPercentage' );
    progressBar.style.width = progressPercentage;

    // Update the log panel.
    const logPanel = document.getElementById( 'progressLogPanel' );
    if (progress.errors.length > 0) {
        logPanel.innerHTML = 'Failed to load some models.<br> See developer console for details.';
        progressBar.style.backgroundColor = '#aa0000';
    } else {
        logPanel.innerHTML = 'Loaded: ' + progressPercentage;
    }

    // Hide after everything has been loaded.
    if (progress.done) {
        //console.log(progress);
        const timeout = progress.errors.length === 0 ? 2000 : 5000;
        setTimeout(() => {
            document.getElementById('progressWindow').style.display = 'none';
        }, timeout)
    }
}

// Hide the canvas if it is not used to render the scene.
if (!config.canvasID) {
    let canvas = document.getElementById( 'canvas' );
    canvas.style.display = 'none';
}

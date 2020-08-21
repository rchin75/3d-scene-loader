import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import LoadingPanel from "./loadingPanel";

export const utils = {
    LoadingPanel
};

/**
 * Creates the scene.
 * @param {Object} config Scene configuration.
 * @param {Object} [params] Parameters.
 * @param {string} [params.canvasID] Optional canvas to render to.
 * @param {Function} [params.onProgress] Optional callback function to keep track of loading progress.
 * @param {Function} [params.onClick] Optional callback function to handle click events.
 */
export default function createScene(config, params) {
    const scene = new THREE.Scene();
    // Mixers are used to animate GLTF meshes.
    const mixers = [];
    const clock = new THREE.Clock();

    const {canvasID, onProgress, onClick} = params;

    // Determine if and how to show loading progress.
    let progressHandler = null;
    if (onProgress === undefined) {
        progressHandler = new LoadingPanel(canvasID).onProgress
    } else if (onProgress !== null) {
        progressHandler = onProgress;
    }

    scene.background = new THREE.Color((config && config.backgroundColor) ? config.backgroundColor : 0xffffff );

    // Renderer
    const renderer = new THREE.WebGLRenderer({antialias: true});

    let canvas, width, height;
    if (canvasID) {
        // Render to canvas (a DIV element with a certain size).
        canvas = document.getElementById( canvasID );
        canvas.appendChild( renderer.domElement );
        width = canvas.clientWidth;
        height = canvas.clientHeight;
    } else {
        // Render to body (full screen).
        canvas = renderer.domElement;
        width = window.innerWidth;
        height = window.innerHeight;
        document.body.appendChild(renderer.domElement);
    }
    renderer.setSize(width, height);

    // Camera
    const fov = config && config.camera && config.camera.fov ? config.camera.fov: 50;
    const near = config && config.camera && config.camera.near ? config.camera.near: 0.1;
    const far = config && config.camera && config.camera.far ? config.camera.far: 10000;

    const camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    if (config && config.camera && config.camera.position) {
        camera.position.set(...config.camera.position);
    } else {
        camera.position.z = 30;
    }

    // Handle window resizes.
    handleWindowResize(camera, renderer, canvasID);

    // Enable controlling the camera with the mouse.
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);

    // Point lights
    if (config && config.pointLights && config.pointLights.length > 0) {
        config.pointLights.forEach(light => {
            addPointLight(light, scene);
        });
    }

    // Directional lights
    if (config && config.directionalLights && config.directionalLights.length > 0) {
        config.directionalLights.forEach(light => {
            addDirectionalLight(light, scene);
        });
    } else {
        addDirectionalLight(null, scene);
    }

    // Ambient light
    addAmbientLight(config.ambientLight, scene);

    // Load the models.
    if (config && config.models && config.models.length > 0) {
        let index = 0;
        const totalProgress = {
            percentage: 0,
            errors: [],
            done: false
        }
        config.models.forEach(model => {
            loadModel(model, scene, mixers, index, progress => {
                // Invoke progressHandler if provided.
                if (progressHandler && (progressHandler instanceof Function)) {
                    updateTotalProgress(model.file, config.models.length, progress, totalProgress);
                    progressHandler(totalProgress);
                }
            });
            index++;
        })
    } else {
        scene.add(createBox());
    }

    // Add a skybox.
    if (config && config.skybox) {
        createSkybox(config.skybox, scene);
    }

    // Add the floor.
    if (config && config.floor) {
        addFloor(config.floor, scene);
    }


    // Add Axis system visualization
    // Up: y (green), Right: x (red), Towards viewer: z (blue)
    if (config && config.axis) {
        const axesHelper = new THREE.AxesHelper(10);
        scene.add(axesHelper);
    }

    // Click events
    if (onClick && (onClick instanceof Function)) {
        handleMouseClickEvents(renderer, width, height, camera, scene, onClick);
    }

    // Animate and render the scene.
    const animate = function () {
        requestAnimationFrame(animate);

        // Update the animation if GLTF meshes.
        const delta = clock.getDelta();
        mixers.forEach(mixer => {
            mixer.update( delta );
        });

        controls.update();
        renderer.render(scene, camera);
    };
    animate();
}

/**
 * Adds a point light.
 * @param {Object} light The light configuration.
 * @param scene The scene.
 */
function addPointLight(light, scene) {
    const color = light.color ? light.color : 0xFFFFFF;
    const intensity = light.intensity ? light.intensity : 1;
    const distance = light.distance ? light.distance : 2;

    const lightInstance = new THREE.PointLight(color, intensity, distance);
    lightInstance.position.set(...light.position);
    scene.add( lightInstance );
}

/**
 * Adds a directional light to the scene.
 * @param {Object} light The light configuration.
 * @param scene The scene.
 */
function addDirectionalLight(light, scene) {
    const color = (light && light.color) ? light.color : 0xFFFFFF;
    const intensity = (light && light.intensity) ? light.intensity : 1;
    const lightInstance = new THREE.DirectionalLight(color, intensity);
    if (light && light.position) {
        lightInstance.position.set(...light.position);
    } else {
        lightInstance.position.set(150, 200, 130);
    }
    if (light && light.target) {
        lightInstance.target.position.set(...light.target);
    } else {
        lightInstance.target.position.set(0, 0, 0);
    }
    scene.add(lightInstance);
    scene.add(lightInstance.target);
}

/**
 * Adds ambient light to the scene.
 * @param {Object} ambientLight Ambient light configuration.
 * @param scene The scene.
 */
function addAmbientLight(ambientLight, scene) {
    const color = (ambientLight && ambientLight.color) ? ambientLight.color : 0xFFFFFF;
    const intensity = (ambientLight && ambientLight.intensity) ? ambientLight.intensity : 0.5;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
}

/**
 * Creates a box just for testing.
 * @returns {THREE.Mesh}
 */
function createBox() {
    const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    const material = new THREE.MeshPhongMaterial( {color: 0xeeeeee} );
    return new THREE.Mesh( geometry, material );
}

/**
 * Loads a model.
 * @param {Object} model The model to load.
 * @param scene The scene.
 * @param {Array} mixers The array of mixers.
 * @param {number} index The model index.
 * @param {Function} cb Callback function to keep track of progress.
 */
function loadModel(model, scene, mixers, index, cb) {
    const loader = new GLTFLoader();
    const progress = {
        model: model.file,
        index: index,
        percentage: 0,
        error: null
    };
    loader.load( model.file , function ( gltf ) {
        // Position the model.
        if (model.position) {
            gltf.scene.position.set(...model.position);
        }
        // Scale the model.
        if (model.scale) {
            gltf.scene.scale.set(model.scale, model.scale, model.scale);
        }
        // Rotate the model.
        // Yaw
        if (model.rotateY) {
            gltf.scene.rotateY(model.rotateY);
        }
        // Pitch
        if (model.rotateX) {
            gltf.scene.rotateX(model.rotateX);
        }
        // Roll
        if (model.rotateZ) {
            gltf.scene.rotateZ(model.rotateZ);
        }

        if (model.name) {
            gltf.scene.name = model.name;
        } else {
            gltf.scene.name = model.file + "_" + index;
        }
        gltf.scene.userData = {
            type: 'gltf',
            clickable: model.clickable ? model.clickable : false,
            file: model.file
        }

        // Add to the scene.
        scene.add( gltf.scene );

        // Animation
        if (model.animate) {
            const mixer = new THREE.AnimationMixer( gltf.scene );
            mixers.push(mixer);
            //const action = mixer.clipAction( gltf.animations[ 0 ] );
            //action.play();
            gltf.animations.forEach((clip) => {mixer.clipAction(clip).play(); });
        }
    }, function (xhr) {
        progress.percentage = xhr.loaded / xhr.total;
        if (cb) {
            cb(progress);
        }
    },
        function ( error ) {
        // We set progress to 100% even though loading failed. So we know that this attempt was completed.
        progress.percentage = 1;
        progress.error = 'Failed to load model: ' + model.file;
        console.error(progress.error);
        if (cb) {
            cb(progress);
        }
    });
}

/**
 * Updates to total progress of loading all the models.
 * @param modelFile The model file name of the models that is currently being loaded.
 * @param numberOfModels The total number of model to be loaded.
 * @param progress The progress of loading the current model (0 to 1)
 * @param totalProgress The total progress object to update.
 */
function updateTotalProgress(modelFile, numberOfModels, progress, totalProgress) {
    // Keeping track of the progress
    if (!totalProgress.hasOwnProperty('_percentages')) {
        totalProgress['_percentages'] = {};
    }
    totalProgress['_percentages'][progress.index] = progress.percentage;
    let total = 0;
    for (let index1 in totalProgress['_percentages']) {
        if (totalProgress['_percentages'].hasOwnProperty(index1)) {
            total += totalProgress['_percentages'][index1];
        }
    }
    totalProgress.percentage = total / numberOfModels;

    if (progress.error) {
        totalProgress.errors.push(progress.error);
    }

    // If everything is loaded then we are done.
    if (totalProgress.percentage === 1) {
        totalProgress.done = true;
    }
}

/**
 * Creates a skybox.
 * @param {Object} skybox Skybox configuration.
 * @param scene The scene.
 */
function createSkybox(skybox, scene) {
    const materialArray = [];
    const folder = skybox.folder;
    const texture_ft = new THREE.TextureLoader().load(folder + skybox.frontSide);
    const texture_bk = new THREE.TextureLoader().load(folder + skybox.backSide);
    const texture_up = new THREE.TextureLoader().load(folder + skybox.upSide);
    const texture_dn = new THREE.TextureLoader().load(folder + skybox.downSide);
    const texture_rt = new THREE.TextureLoader().load(folder + skybox.rightSide);
    const texture_lf = new THREE.TextureLoader().load(folder + skybox.leftSide);

    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

    for (let i = 0; i < 6; i++) {
        materialArray[i].side = THREE.BackSide;
    }

    const size = skybox.size ? skybox.size : 10000;
    const skyboxGeo = new THREE.BoxGeometry( size, size, size);
    const skyboxInstance = new THREE.Mesh( skyboxGeo, materialArray );
    scene.add( skyboxInstance );
}

/**
 * Adds a floor.
 * @param {Object} floor Floor configuration.
 * @param scene The scene.
 */
function addFloor(floor, scene) {
    const size = floor.size ? floor.size : 1000
    const color = floor.color ? floor.color : 0x00FF00;
    const level = floor.level ? floor.level : 0;

    const geometry = new THREE.PlaneGeometry( size, size, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(0.5*Math.PI);
    plane.position.set(0, level, 0);
    scene.add( plane );
}

/**
 * Handles resizing of the browser window.
 * @param camera Camera.
 * @param renderer Renderer.
 * @param {String} canvasID Canvas ID.
 */
function handleWindowResize(camera, renderer, canvasID) {
    let width, height;
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
        if (canvasID) {
            const canvas = document.getElementById( canvasID );
            width = canvas.clientWidth;
            height = canvas.clientHeight;
        } else {
            width = window.innerWidth;
            height = window.innerHeight;
        }
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height );
    }
}

/**
 * Handles mouse click events as well as touch events.
 * @param {Object} renderer The renderer.
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @param camera The camera.
 * @param scene The scene.
 * @param {Function} onClickCallback On click callback function.
 */
function handleMouseClickEvents(renderer, width, height, camera, scene, onClickCallback) {
    const rayCaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const onClick = function(event) {
        if (event.touches) {
            // Touch event.
            mouse.x = ( event.touches[0].clientX / width ) * 2 - 1;
            mouse.y = - ( event.touches[0].clientY / height ) * 2 + 1;
        } else {
            // Mouse event.
            mouse.x = ( event.clientX / width ) * 2 - 1;
            mouse.y = - ( event.clientY / height ) * 2 + 1;
        }
        rayCaster.setFromCamera(mouse, camera);
        const intersects = rayCaster.intersectObjects( scene.children, true );
        let selectedObject = null;
        for (let i=0; i<intersects.length; i++) {
            let obj = intersects[i].object;
            while (obj.parent !== null) {
                obj = obj.parent;
                if (obj.userData && obj.userData.type && (obj.userData.type === 'gltf') && (obj.userData.clickable)) {
                    selectedObject = obj;
                    if (onClickCallback) {
                        onClickCallback({name: selectedObject.name, object: selectedObject});
                    }
                    break;
                }
            }
            if (selectedObject) {
                break;
            }
        }
    }
    // Register both mouse and touch events.
    renderer.domElement.addEventListener('click', onClick, true);
    renderer.domElement.addEventListener('touchstart', onClick, true);
}
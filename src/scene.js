import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Creates the scene.
 */
export default function createScene(config) {
    const scene = new THREE.Scene();
    // Mixers are used to animate GLTF meshes.
    const mixers = [];
    const clock = new THREE.Clock();

    scene.background = new THREE.Color((config && config.backgroundColor) ? config.backgroundColor : 0xffffff );

    // Renderer
    const renderer = new THREE.WebGLRenderer({antialias: true});

    let canvas, width, height;
    if (config && config.canvasID) {
        // Render to canvas (a DIV element with a certain size).
        canvas = document.getElementById( config.canvasID );
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
    handleWindowResize(config, camera, renderer);

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
        config.models.forEach(model => {
            loadModel(model, scene, mixers);
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
 * @param light The light configuration.
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
 * @param light The light configuration.
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
 * @param ambientLight Ambient light configuration.
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
 * @param model The model to load.
 * @param scene The scene.
 */
function loadModel(model, scene, mixers) {
    const loader = new GLTFLoader();
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

    }, undefined, function ( error ) {
        console.error( error );
    } );
}

/**
 * Creates a skybox.
 * @param skybox Skybox configuration.
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
 * @param floor Floor configuration.
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
 * @param config Configuration.
 * @param camera Camera.
 * @param renderer Renderer.
 */
function handleWindowResize(config, camera, renderer) {
    let width, height;
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
        if (config && config.canvasID) {
            const canvas = document.getElementById( config.canvasID );
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
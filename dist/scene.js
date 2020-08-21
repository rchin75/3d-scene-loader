(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"), require("three/examples/jsm/controls/OrbitControls.js"), require("three/examples/jsm/loaders/GLTFLoader.js"));
	else if(typeof define === 'function' && define.amd)
		define(["three", "three/examples/jsm/controls/OrbitControls.js", "three/examples/jsm/loaders/GLTFLoader.js"], factory);
	else if(typeof exports === 'object')
		exports["scene"] = factory(require("three"), require("three/examples/jsm/controls/OrbitControls.js"), require("three/examples/jsm/loaders/GLTFLoader.js"));
	else
		root["scene"] = factory(root["three"], root["three/examples/jsm/controls/OrbitControls.js"], root["three/examples/jsm/loaders/GLTFLoader.js"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_three__, __WEBPACK_EXTERNAL_MODULE_three_examples_jsm_controls_OrbitControls_js__, __WEBPACK_EXTERNAL_MODULE_three_examples_jsm_loaders_GLTFLoader_js__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scene.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/boundingBox.js":
/*!****************************!*\
  !*** ./src/boundingBox.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoundingBox; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);


/**
 * A bounding box that can be drawn in the scene.
 */
class BoundingBox {
    /**
     * Constructor.
     * @param {Object} [params] Optional parameters {color, linewidth}.
     */
    constructor(params) {
        const color = (params && params.color) ? params.color : 0x0000FF;
        const linewidth = (params && params.lineWidth) ? params.lineWidth : 5;

        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BoxGeometry"]( 1,1,1 );
        const material = new three__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"]( {color, linewidth} );
        this._mesh = new three__WEBPACK_IMPORTED_MODULE_0__["LineSegments"] ( new three__WEBPACK_IMPORTED_MODULE_0__["EdgesGeometry"](geometry), material );
        this._bounds = null;
        this._center = {x:0,y:0,z:0};
    }

    /**
     * Updates the bounding box' size and position.
     * @param object The object to bound.
     */
    update(object) {
        const helper = new three__WEBPACK_IMPORTED_MODULE_0__["BoxHelper"](object);
        helper.geometry.computeBoundingBox();
        this._bounds = helper.geometry.boundingBox;

        const xSize = this._bounds.max.x - this._bounds.min.x;
        const ySize = this._bounds.max.y - this._bounds.min.y;
        const zSize = this._bounds.max.z - this._bounds.min.z;
        this._center.x = this._bounds.min.x + xSize/2;
        this._center.y = this._bounds.min.y + ySize/2;
        this._center.z = this._bounds.min.z + zSize/2;

        this._mesh.scale.set(xSize, ySize, zSize);
        this._mesh.position.set(this._center.x,this._center.y,this._center.z);
    }

    /**
     * Gets the mesh of the bounding box.
     * @returns {LineSegments}
     */
    get mesh() {
        return this._mesh;
    }

    /**
     * Gets the bounds.
     * @returns {Object}
     */
    get bounds() {
        return this._bounds;
    }

    /**
     * Gets the center of the bounding box.
     * @returns {{x: number, y: number, z: number}}
     */
    get center() {
        return this._center;
    }
}

/***/ }),

/***/ "./src/loadingPanel.js":
/*!*****************************!*\
  !*** ./src/loadingPanel.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoadingPanel; });
/**
 * Dynamic generation of a simple loading window with a progress bar.
 * @param canvasID Optional canvas ID. If provided the loading window will be rendered inside the canvas DIV.
 * @returns {{onProgress: onProgress}} An onProgress function to pass to createScene().
 */
function LoadingPanel (canvasID) {
    const prefix = canvasID ? canvasID + '_' : '';
    generateCSS(canvasID, prefix);
    generateHTML(canvasID, prefix);

    /**
     * Updates the progress info.
     * @param progress Progress object from the scene generator.
     */
    function onProgress(progress) {
        const progressPercentage = (progress.percentage * 100) + "%";

        // Updates the progress bar.
        const progressBar = document.getElementById( prefix + 'progressBarPercentage' );
        progressBar.style.width = progressPercentage;

        // Update the log panel.
        const logPanel = document.getElementById( prefix + 'progressLogPanel' );
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
                document.getElementById(prefix + 'progressWindow').style.display = 'none';
            }, timeout)
        }
    }

    return {
        onProgress: onProgress
    };
}

/**
 * Generates the CSS for the loading panel.
 * @param canvasID Optional canvas ID.
 * @param prefix ID prefix.
 */
function generateCSS(canvasID, prefix) {
    const style = document.createElement('style');
    //Deprecated: style.type = 'text/css';
    let inner = '';
    if (canvasID) {
        inner += `
        #${prefix}progressWindowOuterContainer {
            box-sizing: border-box;
            position: absolute;
            overflow: visible;
            width: 100%;
            height: 0px;
            margin: 0;
            padding: 0;
            z-index: 100000;
        }
        `;
    } else {
        inner += `
        #${prefix}progressWindowOuterContainer {
            box-sizing: border-box;
            position: fixed;
            overflow: visible;
            width: 100%;
            height: 0px;
            margin: 0;
            padding: 0;
            z-index: 100000;
        }
        `;
    }

    inner += `
    #${prefix}progressWindow {
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        width: 300px;
        height: 130px;
        top: 50px;
        margin-left: auto;
        margin-right: auto;
        background-color: black;
        color: white;
        border: 1px solid #cccccc;
        padding: 10px;
    }
    
    #${prefix}progressWindowHeader {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 10px;
    }
    
    #${prefix}progressBar {
        box-sizing: border-box;
        width: 100%;
        height: 16px;
        background-color: #aaaaaa;
        border: 1px solid #666666;
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    #${prefix}progressBarPercentage {
        box-sizing: border-box;
        width: 0%;
        height: 14px;
        background-color: #00ee00;
        overflow: hidden;
    }
    
    #${prefix}progressLogPanel {
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        border: 1px solid #666666;
        overflow: auto;
        padding: 5px;
        font-size: 12px;
    }
    `;
    style.innerHTML = inner;
    document.getElementsByTagName('head')[0].appendChild(style);
}

/**
 * Generates the HTML for the loading panel.
 * @param canvasID Optional canvas ID.
 * @param prefix ID prefix.
 */
function generateHTML(canvasID, prefix) {
    const div = document.createElement('div');
    div.id = prefix + 'progressWindowOuterContainer';
    div.innerHTML = `
        <div id="${prefix}progressWindow">
            <div id="${prefix}progressWindowHeader">Loading scene ...</div>
            <div id="${prefix}progressBar">
                <div id="${prefix}progressBarPercentage"></div>
            </div>
            <div id="${prefix}progressLogPanel"></div>
        </div>
    `;
    if (canvasID) {
        document.getElementById(canvasID).appendChild(div);
    } else {
        document.getElementsByTagName('body')[0].appendChild(div);
    }

}


/***/ }),

/***/ "./src/scene.js":
/*!**********************!*\
  !*** ./src/scene.js ***!
  \**********************/
/*! exports provided: utils, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return utils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createScene; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _loadingPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loadingPanel */ "./src/loadingPanel.js");
/* harmony import */ var _boundingBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./boundingBox */ "./src/boundingBox.js");






const utils = {
    LoadingPanel: _loadingPanel__WEBPACK_IMPORTED_MODULE_3__["default"],
    BoundingBox: _boundingBox__WEBPACK_IMPORTED_MODULE_4__["default"]
};

/**
 * Creates the scene.
 * @param {Object} config Scene configuration.
 * @param {Object} [params] Parameters.
 * @param {string} [params.canvasID] Optional canvas to render to.
 * @param {Function} [params.onProgress] Optional callback function to keep track of loading progress.
 * @param {Function} [params.onClick] Optional callback function to handle click events.
 */
function createScene(config, params) {
    const scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
    // Mixers are used to animate GLTF meshes.
    const mixers = [];
    const clock = new three__WEBPACK_IMPORTED_MODULE_0__["Clock"]();

    const {canvasID, onProgress, onClick} = params;

    // Determine if and how to show loading progress.
    let progressHandler = null;
    if (onProgress === undefined) {
        progressHandler = new _loadingPanel__WEBPACK_IMPORTED_MODULE_3__["default"](canvasID).onProgress
    } else if (onProgress !== null) {
        progressHandler = onProgress;
    }

    scene.background = new three__WEBPACK_IMPORTED_MODULE_0__["Color"]((config && config.backgroundColor) ? config.backgroundColor : 0xffffff );

    // Renderer
    const renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({antialias: true});
    // Correct lightning. See: https://discourse.threejs.org/t/whats-this-about-gammafactor/4264/5
    renderer.gammaOutput = true;
    // Deprecated: renderer.gammaFactor = 2.2;

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

    const camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](fov, width / height, near, far);
    if (config && config.camera && config.camera.position) {
        camera.position.set(...config.camera.position);
    } else {
        camera.position.z = 30;
    }

    // Handle window resizes.
    handleWindowResize(camera, renderer, canvasID);

    // Enable controlling the camera with the mouse.
    const controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__["OrbitControls"](camera, canvas);
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
        const axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__["AxesHelper"](10);
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

    return scene;
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

    const lightInstance = new three__WEBPACK_IMPORTED_MODULE_0__["PointLight"](color, intensity, distance);
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
    const lightInstance = new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLight"](color, intensity);
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
    const light = new three__WEBPACK_IMPORTED_MODULE_0__["AmbientLight"](color, intensity);
    scene.add(light);
}

/**
 * Creates a box just for testing.
 * @returns {THREE.Mesh}
 */
function createBox() {
    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BoxBufferGeometry"]( 1, 1, 1 );
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]( {color: 0xeeeeee} );
    return new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"]( geometry, material );
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
    const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__["GLTFLoader"]();
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

        // Meta data. Needed for the onClick handler.
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

        // Corrections
        // Metallic models appear very dark, so remove the metalness. Not sure if there is a better solution.
        // See: https://discourse.threejs.org/t/ambient-light-and-gltf-models-not-working-results-in-black-model/7428/4
        gltf.scene.traverse( child => {
            if ( child.material ) child.material.metalness = 0;
        });

        // Add to the scene.
        scene.add( gltf.scene );

        // Animation
        if (model.animate) {
            const mixer = new three__WEBPACK_IMPORTED_MODULE_0__["AnimationMixer"]( gltf.scene );
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
    const texture_ft = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(folder + skybox.frontSide);
    const texture_bk = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(folder + skybox.backSide);
    const texture_up = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(folder + skybox.upSide);
    const texture_dn = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(folder + skybox.downSide);
    const texture_rt = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(folder + skybox.rightSide);
    const texture_lf = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load(folder + skybox.leftSide);

    materialArray.push(new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]( { map: texture_ft }));
    materialArray.push(new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]( { map: texture_bk }));
    materialArray.push(new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]( { map: texture_up }));
    materialArray.push(new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]( { map: texture_dn }));
    materialArray.push(new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]( { map: texture_rt }));
    materialArray.push(new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]( { map: texture_lf }));

    for (let i = 0; i < 6; i++) {
        materialArray[i].side = three__WEBPACK_IMPORTED_MODULE_0__["BackSide"];
    }

    const size = skybox.size ? skybox.size : 10000;
    const skyboxGeo = new three__WEBPACK_IMPORTED_MODULE_0__["BoxGeometry"]( size, size, size);
    const skyboxInstance = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"]( skyboxGeo, materialArray );
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

    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"]( size, size, 1, 1 );
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]( {color: color, side: three__WEBPACK_IMPORTED_MODULE_0__["DoubleSide"]} );
    const plane = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"]( geometry, material );
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
    const rayCaster = new three__WEBPACK_IMPORTED_MODULE_0__["Raycaster"]();
    const mouse = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
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
        if (!selectedObject) {
            // Nothing was selected. Still call the callback to any previously selected object can be deselected.
            onClickCallback({name: null, object: null});
        }
    }
    // Register both mouse and touch events.
    renderer.domElement.addEventListener('click', onClick, true);
    renderer.domElement.addEventListener('touchstart', onClick, true);
}

/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "three" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_three__;

/***/ }),

/***/ "three/examples/jsm/controls/OrbitControls.js":
/*!***************************************************************!*\
  !*** external "three/examples/jsm/controls/OrbitControls.js" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_three_examples_jsm_controls_OrbitControls_js__;

/***/ }),

/***/ "three/examples/jsm/loaders/GLTFLoader.js":
/*!***********************************************************!*\
  !*** external "three/examples/jsm/loaders/GLTFLoader.js" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_three_examples_jsm_loaders_GLTFLoader_js__;

/***/ })

/******/ });
});
//# sourceMappingURL=scene.js.map
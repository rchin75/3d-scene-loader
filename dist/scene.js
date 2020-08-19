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

/***/ "./src/loadingPanel.js":
/*!*****************************!*\
  !*** ./src/loadingPanel.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return generateLoadingPanel; });
/**
 * Dynamic generation of a simple loading window with a progress bar.
 * @param canvasID Optional canvas ID. If provided the loading window will be rendered inside the canvas DIV.
 * @returns {{onProgress: onProgress}} An onProgress function to pass to createScene().
 */
function generateLoadingPanel (canvasID) {
    generateCSS(canvasID);
    generateHTML(canvasID);
    return {
        onProgress: onProgress
    };
}

/**
 * Generates the CSS for the loading panel.
 * @param canvasID Optional canvas ID.
 */
function generateCSS(canvasID) {
    const style = document.createElement('style');
    //Deprecated: style.type = 'text/css';
    let inner = '';
    if (canvasID) {
        inner += `
        #progressWindowOuterContainer {
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
        #progressWindowOuterContainer {
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
    #progressWindow {
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
    
    #progressWindowHeader {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 10px;
    }
    
    #progressBar {
        box-sizing: border-box;
        width: 100%;
        height: 16px;
        background-color: #aaaaaa;
        border: 1px solid #666666;
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    #progressBarPercentage {
        box-sizing: border-box;
        width: 0%;
        height: 14px;
        background-color: #00ee00;
        overflow: hidden;
    }
    
    #progressLogPanel {
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
 */
function generateHTML(canvasID) {
    const div = document.createElement('div');
    div.id = 'progressWindowOuterContainer';
    div.innerHTML = `
        <div id="progressWindow">
            <div id="progressWindowHeader">Loading scene ...</div>
            <div id="progressBar">
                <div id="progressBarPercentage"></div>
            </div>
            <div id="progressLogPanel"></div>
        </div>
    `;
    if (canvasID) {
        document.getElementById(canvasID).appendChild(div);
    } else {
        document.getElementsByTagName('body')[0].appendChild(div);
    }

}

/**
 * Updates the progress info.
 * @param progress Progress object from the scene generator.
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





const utils = {
    generateLoadingPanel: _loadingPanel__WEBPACK_IMPORTED_MODULE_3__["default"]
};

/**
 * Creates the scene.
 */
function createScene(config, onProgress) {
    const scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
    // Mixers are used to animate GLTF meshes.
    const mixers = [];
    const clock = new three__WEBPACK_IMPORTED_MODULE_0__["Clock"]();

    scene.background = new three__WEBPACK_IMPORTED_MODULE_0__["Color"]((config && config.backgroundColor) ? config.backgroundColor : 0xffffff );

    // Renderer
    const renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({antialias: true});

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

    const camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](fov, width / height, near, far);
    if (config && config.camera && config.camera.position) {
        camera.position.set(...config.camera.position);
    } else {
        camera.position.z = 30;
    }

    // Handle window resizes.
    handleWindowResize(config, camera, renderer);

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
                // Invoke onProgress if provided.
                if (onProgress) {
                    updateTotalProgress(model.file, config.models.length, progress, totalProgress);
                    onProgress(totalProgress);
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

    const lightInstance = new three__WEBPACK_IMPORTED_MODULE_0__["PointLight"](color, intensity, distance);
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
 * @param ambientLight Ambient light configuration.
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
 * @param model The model to load.
 * @param scene The scene.
 * @param mixers The array of mixers.
 * @param index The model index.
 * @param cb Callback function to keep track of progress.
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
 * @param skybox Skybox configuration.
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
 * @param floor Floor configuration.
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
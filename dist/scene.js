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

/***/ "./src/scene.js":
/*!**********************!*\
  !*** ./src/scene.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createScene; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__);




/**
 * Creates the scene.
 */
function createScene(config) {
    const scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
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

    // Directional lights
    if (config && config.directionalLights && config.directionalLights.length > 0) {
        config.directionalLights.forEach(light => {
            addDirectionalLight(light, scene);
        })
    } else {
        addDirectionalLight(null, scene);
    }

    // Ambient light
    addAmbientLight(config.ambientLight, scene);

    // Load the models.
    if (config && config.models && config.models.length > 0) {
        config.models.forEach(model => {
            loadModel(model, scene);
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

        controls.update();
        renderer.render(scene, camera);
    };
    animate();
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
 */
function loadModel(model, scene) {
    const loader = new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_2__["GLTFLoader"]();
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

    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"]( size, size, 1, 1 );
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]( {color: color, side: three__WEBPACK_IMPORTED_MODULE_0__["DoubleSide"]} );
    const plane = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"]( geometry, material );
    plane.rotateX(0.5*Math.PI);
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
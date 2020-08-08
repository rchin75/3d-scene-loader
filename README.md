# 3d-scene-loader
By R.T.H. Chin, The Netherlands, 2020.

This is a library that loads a 3D scene in a very simple way.
Depends on Three JS.

See /example for how to use.
Models and Skyboxes are not included.

Note: this is my hobby project. For informational purposes only. Use at your own risk.

## Project setup
```
npm install
```

### Compiles and hot-reloads the example for development
```
npm run serve
```

### Compiles and minifies the library for production
```
npm run build
```
### Compiles and minifies the example
```
npm run build-example
```
To try the example create two folders under the project root folder:

- models: add your model(s) here. Models should be in GLTF format.
- skyboxes: add your skybox here.

Then refer to these in the configuration (in main.js).
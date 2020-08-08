const path = require('path');

module.exports = [
    'source-map'
].map(devtool => ({
    mode: 'development',
    entry: './src/scene.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scene.js',
        library: 'scene',
        libraryTarget: 'umd',
    },
    externals: [
        'three',
        // Everything that starts with "three/"
        /^three\/.+$/,
    ],
    devtool,
    optimization: {
        runtimeChunk: false // when true it does not work for some reason.
    }
}));
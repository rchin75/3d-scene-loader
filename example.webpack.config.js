const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    'source-map'
].map(devtool => ({
    mode: 'development',
    entry: './example/main.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: ['./dist-example', './models', './skyboxes'],
        contentBasePublicPath: ['/', '/models', '/skyboxes']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist-example'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'example', '**/*.html'),
                    context: 'example/',
                    flatten: false
                },
                {
                    from: path.resolve(__dirname, 'example', '**/*.css'),
                    context: 'example/',
                    flatten: false
                },
            ],
        }),
    ]
}));

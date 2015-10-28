
Package.describe({
    name: 'vizhe:stylus',
    version: '0.0.9',
    summary: 'Stylus + url + autoprefixer + postcss-svg + postcss-zindex',
    git: 'https://github.com/hoppas/meteor-plugin-stylus.git',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'compileStylus',
    use: [],
    sources: [
        'plugin/compile-stylus.js'
    ],
    npmDependencies: {
        'stylus': '0.52.4',
        'poststylus': '0.2.1',
        'autoprefixer': '6.0.3',
        'postcss-svg': '1.0.1',
        'postcss-zindex': '2.0.0'
    }
});

Package.onTest(function (api) {
    api.use(['vizhe:stylus', 'tinytest', 'test-helpers', 'templating']);
    api.addAssets([
        'tests/tinytest.png',
        'tests/tinytest.svg'
    ], 'client')
    api.add_files([
        'tests/tinytest.html',
        'tests/tinytest.styl',
        'tests/tinytest.js'
    ], 'client');
});

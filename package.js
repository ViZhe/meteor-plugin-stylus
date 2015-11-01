
Package.describe({
    name: 'vizhe:stylus',
    version: '0.2.0',
    summary: 'Stylus + url + autoprefixer + postcss-svg + postcss-zindex',
    git: 'https://github.com/hoppas/meteor-plugin-stylus.git',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'compileStylus',
    use: ['coffeescript'],
    sources: [
        'plugin/compile-stylus.coffee'
    ],
    npmDependencies: {
        'stylus': '0.52.4',
        'poststylus': '0.2.1',
        'autoprefixer': '6.0.3',
        'postcss-svg': '1.0.1',
        'postcss-zindex': '2.0.0'
    }
});

Package.onUse(function (api) {
    api.add_files([
        'plugin/empty.mixin.styl',
        'plugin/empty.var.styl'
    ], 'client');
});

Package.onTest(function (api) {
    api.use([
        'coffeescript',
        'vizhe:stylus',
        'tinytest',
        'test-helpers',
        'templating',
    ]);
    api.addAssets([
        'public/tinytest.png',
        'public/tinytest.svg'
    ], 'client');
    api.add_files([
        'tests/tinytest.html',
        'tests/tinytest.import.styl',
        'tests/tinytest.var.styl',
        'tests/tinytest.styl',
        'tests/tinytest.coffee'
    ], 'client');
});

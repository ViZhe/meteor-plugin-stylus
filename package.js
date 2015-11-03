
Package.describe({
    name: 'vizhe:stylus',
    version: '0.3.1',
    summary: 'Stylus + url + autoprefixer + postcss-svg + postcss-zindex',
    git: 'https://github.com/hoppas/meteor-plugin-stylus.git',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'compileStylus',
    use: ['coffeescript@1.0.11'],
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
        'client/styles/vars/tinytest.styl',
        'tests/tinytest.styl',
        'tests/tinytest.coffee'
    ], 'client');
});

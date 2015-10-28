
var path = Npm.require('path');
var stylus = Npm.require('stylus');
var poststylus = Npm.require('poststylus');
var autoprefixer = Npm.require('autoprefixer');
var svg = Npm.require('postcss-svg');
var zindex = Npm.require('postcss-zindex');

// for next
// {
//     'autoprefixerEnable': true,
//     'autoprefixer': {
//         'browser': ['last 2 versions',
//                     'Explorer >= 10',
//                     'Android >= 4.1',
//                     'Safari >= 7',
//                     'iOS >= 7']
//     },
//     'imageInlinerEnable': true,
//     'imageInliner': {
//         'assetPaths': [],
//         'maxFileSize': 30000
//     },
//     'svgEnable': true,
//     'svg': {
//         'svgo': true,
//         'maxFileSize': 30000
//     }
// }


Plugin.registerSourceHandler('styl', {archMatching: 'web'}, function (compileStep) {
    var source = compileStep.read().toString('utf8');
    var compiler = stylus(source)
        .define('url', stylus.url())
        .use(poststylus([
            autoprefixer({
                browsers: ['last 2 versions',
                        'Explorer >= 10',
                        'Android >= 4.1',
                        'Safari >= 7',
                        'iOS >= 7']
            }),
            svg({
                svgo: true
            }),
            zindex()
        ]))
        .set('filename', compileStep.inputPath)
        // relative @import
        .include(path.dirname(compileStep._fullInputPath))
        // absolute @import
        .include(process.cwd());

    var errCb = function(msg) {
        compileStep.error({
            message: 'Stylus compiler error: ' + msg
        });
    };

    try {
        compiler.render(function (err, css) {
            if (err) {
                return errCb(err.message);
            }
            compileStep.addStylesheet({
                path: compileStep.inputPath + '.css',
                data: css
            });
        });
    } catch(err) {
        errCb(err.message);
    }
});

Plugin.registerSourceHandler('import.styl', function () {});

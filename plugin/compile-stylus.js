
var fsjson = Npm.require('fs-json')();
var path = Npm.require('path');
var stylus = Npm.require('stylus');
var poststylus = Npm.require('poststylus');
var autoprefixer = Npm.require('autoprefixer');
var svg = Npm.require('postcss-svg');
var zindex = Npm.require('postcss-zindex');


Plugin.registerSourceHandler('styl', {archMatching: 'web'}, function (compileStep) {


    var options = fsjson.loadSync('./plugin/stylus.json');
    var file = fsjson.load('./config/stylus.json', function(data) {
        result = data ? false : data;
    });
    mergeObj = function (a,b) {
        var c = {}, key;
        for (key in a) {
            if (a.hasOwnProperty(key)) {
                c[key] = typeof b[key] != 'undefined' ? b[key] : a[key];
            }
        }
        return c;
    }
    var config = mergeObj(options, file);


    var source = compileStep.read().toString('utf8');
    var compiler = stylus(source)
        .define('url', stylus.url(config.url))
        .use(poststylus([
            autoprefixer(config.autoprefixer),
            svg(config.svg),
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

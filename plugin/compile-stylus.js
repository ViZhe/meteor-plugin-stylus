
var path = Npm.require('path');
var fs = Npm.require('fs');

var stylus = Npm.require('stylus');
var poststylus = Npm.require('poststylus');
var autoprefixer = Npm.require('autoprefixer');
var svg = Npm.require('postcss-svg');
var zindex = Npm.require('postcss-zindex');


Plugin.registerSourceHandler('styl', {archMatching: 'web'}, function (compileStep) {
    var configpath = path.join(process.cwd(), '/config/stylus.json');
    var config;

    if(fs.existsSync(configpath)) {
        try {
            config = JSON.parse(fs.readFileSync(configpath, 'utf-8'));
        } catch(e) {
            throw 'Stylus configuration file error: ' + e;
        }
    }
    var options = {
        url: {
            limit: 30000
        },
        autoprefixer: {
            browser: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']
        },
        svg: {
            svgo: true
        }
    };

    if(!config.url) {
        config.url =  options.url;
    }
    if(!config.autoprefixer) {
        config.autoprefixer =  options.autoprefixer;
    }
    if(!config.svg) {
        config.svg =  options.svg;
    }

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

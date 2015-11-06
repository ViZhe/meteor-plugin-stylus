
fs = Npm.require('fs')

stylus = Npm.require('stylus')
poststylus = Npm.require('poststylus')
autoprefixer = Npm.require('autoprefixer')
svg = Npm.require('postcss-svg')
zindex = Npm.require('postcss-zindex')


Plugin.registerCompiler {
    extensions: ['styl']
    archMatching: 'web'
}, ->
    compiler = new StylusCompiler

StylusCompiler = ->

StylusCompiler::processFilesForTarget = (files) ->
    files.sort(sortFiles)

    source = ''
    files.forEach (file) ->
        if /\.import\.styl$/.test(file.getPathInPackage())
            return
        source += file.getContentsAsString()
        return

    projectPath = process.cwd()
    configPath = projectPath + '/config/stylus.json'
    config = {}

    if fs.existsSync(configPath)
        try
            config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        catch e
            throw 'Stylus configuration file error: ' + e

    config = _.extend(
        url:
            paths: ['./public/']
            limit: 30000
        autoprefixer:
            browser: [
                'last 2 versions'
                'Explorer >= 10'
                'Android >= 4.1'
                'Safari >= 7'
                'iOS >= 7'
            ]
        svg:
            svgo: true
            ei: false

        , config
    )

    compiler = stylus(source)
        .define('url', stylus.url(config.url))
        .use(poststylus([
            svg(config.svg)
            zindex()
            autoprefixer(config.autoprefixer)
        ]))
        .include(projectPath)

    errMes = (msg) ->
        files[0].error
            message: 'Stylus compiler error: ' + msg
            sourcePath: 'compiled-styles.css'
        return

    try
        compiler.render (err, css) ->
            if err
                return errMes err.message

            files[0].addStylesheet
                data: css
                path: 'compiled-styles.css'
            return

    catch err
        errMes err.message

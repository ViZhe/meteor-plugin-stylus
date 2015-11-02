
path = Npm.require('path')
fs = Npm.require('fs')

stylus = Npm.require('stylus')
poststylus = Npm.require('poststylus')
autoprefixer = Npm.require('autoprefixer')
svg = Npm.require('postcss-svg')
zindex = Npm.require('postcss-zindex')

extend = (a, b) ->
    for key of b
        if b.hasOwnProperty(key)
            a[key] = b[key]
    return a


Plugin.registerSourceHandler 'import.styl', ->

mixinFiles = []
Plugin.registerSourceHandler 'mixin.styl', (compileStep) ->
    mixinFiles.push compileStep._fullInputPath

varsFiles = []
Plugin.registerSourceHandler 'var.styl', (compileStep) ->
    varsFiles.push compileStep._fullInputPath

Plugin.registerSourceHandler 'styl', {archMatching: 'web'}, (compileStep) ->
    projectPath = process.cwd()
    configPath = path.join(projectPath, '/config/stylus.json')
    config = options =
        url:
            paths: [ './public/' ]
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
            paths: [ './public/' ]
            svgo: true

    if fs.existsSync(configPath)
        try
            config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        catch e
            throw 'Stylus configuration file error: ' + e
        config = extend(options, config)
    else
        config = options


    source = compileStep.read().toString('utf8')
    compiler = stylus(source)

    if mixinFiles
        for mixinFile in mixinFiles
            compiler.import(mixinFile)
    if varsFiles
        for varsFile in varsFiles
            compiler.import(varsFile)

    compiler
        .define('url', stylus.url(config.url))
        .use(poststylus([
            autoprefixer(config.autoprefixer)
            svg(config.svg)
            zindex()
        ]))
        .set('filename', compileStep.inputPath)
        .include(path.dirname(compileStep._fullInputPath))
        .include(projectPath)

    errCb = (msg) ->
        compileStep.error message: 'Stylus compiler error: ' + msg
        return

    try
        compiler.render (err, css) ->
            if err
                return errCb(err.message)
            compileStep.addStylesheet
                path: compileStep.inputPath + '.css'
                data: css
            return
    catch err
        errCb err.message
    return

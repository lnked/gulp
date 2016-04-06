'use strict';

const $             = require('gulp-load-plugins')();
const gulp          = require('gulp');
const clean         = require("../utils/clean.js");
const errorHandler  = require("../utils/errorHandler.js");
const support       = require("../utils/support.js");

function generateScripts(options, scriptName)
{
    gulp.src(options.src + '/**/*.js')
        .pipe($.plumber({errorHandler: errorHandler}))
        .pipe($.debug({'title': options.taskName}))
        .pipe($.if(!options.is.build, $.sourcemaps.init()))

        .pipe($.wrapper({
            header: '\n// ${filename}\n\n',
            footer: '\n'
        }))

        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError())

        .pipe($.react())

        .pipe($.if(
            options.is.webpack,
                $.webpack({
                    bail: false,
                    debug: true,
                    watch: true,
                    module: {
                    loaders: [{
                    test: /\.css$/,
                    loader: 'style!css'
                }]
            }})
        ))

        .pipe($.concat(scriptName + '.js'))

        .pipe($.rename({suffix: '.min'}))

        .pipe($.if(
            options.is.coffee,
            $.coffee()
        ))

        .pipe($.if(
            options.is.typescript,
            $.typescript({
                noImplicitAny: true,
                declaration: true,
                noExternalResolve: true
            })
        ))

        .pipe($.if(
            options.is.build || options.rm,
            $.uglify()
        ))

        .pipe($.if(!options.is.build, $.sourcemaps.write()))

        .pipe($.debug({'title': options.taskName}))

        .pipe(gulp.dest(options.app))

        .pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

}

module.exports = function(options) {
    
    return function(callback) {

        // clean(options.app, options.rm);
        
        let folders = support.getFolders(options.dir);

        if (folders.length)
        {
            let i;

            for (i in folders)
            {
                options.src = folders[i].dir;
                generateScripts(options, folders[i].cat);
            }
        }
        else
        {
            generateScripts(options, 'main');
        }

        callback();
    };

};
'use strict';

const $             = require('gulp-load-plugins')();
const gulp          = require('gulp');
const path          = require('path');
const clean         = require("../utils/clean.js");
const errorHandler  = require("../utils/errorHandler.js");

module.exports = function(options) {
    
    return function(callback) {

        function fileContents (filePath, file) {
            return file.contents.toString();
        }

        gulp.src(options.app.file)
            .pipe($.inject(
                gulp.src(options.src)
                .pipe($.svgmin(function (file) {
                    var prefix = path.basename(file.relative, path.extname(file.relative));
                    return {
                        plugins: [
                            {
                                removeTitle: true
                            },
                            {
                                removeDoctype: true
                            },
                            {
                                removeComments: true
                            },
                            {
                                cleanupNumericValues: {
                                    floatPrecision: 2
                                }
                            },
                            {
                                convertColors: {
                                    names2hex: false,
                                    rgb2hex: true
                                }
                            },
                            {
                                cleanupIDs: {
                                    prefix: prefix + '-',
                                    minify: false
                                }
                            }
                        ]
                    }
                }))
                .pipe($.svgstore({ inlineSvg: true })), { transform: fileContents }))
                .pipe(gulp.dest(options.app.path));
       
        callback();
    };

};
'use strict';

const $             = require('gulp-load-plugins')();
const gulp          = require('gulp');
const clean         = require("../utils/clean.js");
const errorHandler  = require("../utils/errorHandler.js");
const postcss       = require("postcss");
const stylelint     = require("stylelint");
const reporter      = require("postcss-reporter");
const scss          = require("postcss-scss");

module.exports = function(options) {
    
    return function(callback) {

        gulp.src(options.src)
            .pipe($.plumber({errorHandler: errorHandler}))
            .pipe(postcss([
                stylelint({
                    
                }),
                reporter({ clearMessages: true }),
            ], {
                syntax: scss
            }));

        callback();
    };

};

gulp.task("build:scss", function () {
  return gulp.src("src/**/*.scss")
    
})

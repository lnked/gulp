'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp			= require('gulp');
const gulpDeploy	= require('gulp-deploy-ftp');
const errorHandler 	= require("../utils/errorHandler.js");

module.exports = function(options) {
	
	return function(callback) {

		return gulp.src(options.app)
			.pipe($.plumber({errorHandler: errorHandler}))
			.pipe(gulpDeploy(options.cfg))
			.pipe(gulp.dest(options.folder));
			.pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

	};

};
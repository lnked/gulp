'use strict';

const $      		= require('gulp-load-plugins')();
const gulp			= require('gulp');
const clean     	= require("../utils/clean.js");
const errorHandler  = require("../utils/errorHandler.js");
const critical 		= require('critical').stream;

module.exports = function(options) {
	return function(callback) {
		clean(options.app, options.is.build);

		gulp.src(options.src)

			.pipe($.plumber({errorHandler: errorHandler}))

			.pipe($.debug({'title': options.taskName}))

			// .pipe($.if(!options.is.build, $.sourcemaps.init()))

			.pipe(gulp.dest(options.app))

			.pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

		callback();
	};
};



// // Generate & Inline Critical-path CSS 
// gulp.task('critical', function () {
// return gulp.src('dist/*.html')
// .pipe(critical({base: 'dist/', inline: true, css: ['dist/styles/components.css','dist/styles/main.css']}))
// .pipe(gulp.dest('dist'));
// });


// var critical = require('critical');

// gulp.task('critical', function (cb) {
// critical.generate({
// base: '_site/',
// src: 'index.html',
// css: ['css/all.min.css'],
// dimensions: [{
// width: 320,
// height: 480
// },{
// width: 768,
// height: 1024
// },{
// width: 1280,
// height: 960
// }],
// dest: '../_includes/critical.css',
// minify: true,
// extract: false,
// ignore: ['font-face']
// });
// });

// critical.generate({
// inline: true,
// base: 'test/',
// src: 'index.html',
// dest: 'index-critical.html',
// minify: true,
// width: 1300,
// height: 900
// });

// critical.generate({
// base: 'test/',
// src: 'index.html',
// dest: 'styles/main.css',
// dimensions: [{
// height: 200,
// width: 500
// }, {
// height: 900,
// width: 1200
// }]
// });



// critical.generate({
// base: 'test/',
// src: 'index.html',
// dest: 'styles/main.css',
// width: 1300,
// height: 900
// });


// critical.generate({
// base: 'test/',
// src: 'index.html',
// dest: 'styles/styles.min.css',
// minify: true,
// width: 1300,
// height: 900
// });


// critical.generate({
// inline: true,
// base: 'test/',
// src: 'index.html',
// dest: 'index-critical.html',
// width: 1300,
// height: 900
// });



// critical.generate({
// // Inline the generated critical-path CSS 
// // - true generates HTML 
// // - false generates CSS 
// inline: true

// // Your base directory 
// base: 'dist/',

// // HTML source 
// html: '<html>...</html>',

// // HTML source file 
// src: 'index.html',

// // Your CSS Files (optional) 
// css: ['dist/styles/main.css'],

// // Viewport width 
// width: 1300,

// // Viewport height 
// height: 900,

// // Target for final HTML output. 
// // use some css file when the inline option is not set 
// dest: 'index-critical.html',

// // Minify critical-path CSS when inlining 
// minify: true,

// // Extract inlined styles from referenced stylesheets 
// extract: true,

// // Prefix for asset directory 
// pathPrefix: '/MySubfolderDocrot',

// // ignore css rules 
// ignore: ['font-face',/some-regexp/],

// // overwrite default options 
// ignoreOptions: {}
// });

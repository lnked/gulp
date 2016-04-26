'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');
const spritesmith 	= require('gulp.spritesmith');
const errorHandler 	= require("../utils/errorHandler.js");

module.exports = function(options) {

	return function(callback) {
		
		let spriteData = gulp.src(options.src).pipe(spritesmith({
			imgName: options.sprite.image,
			cssName: options.sprite.style
		}));

	    spriteData.img.pipe(gulp.dest(options.app));
	    spriteData.css.pipe(gulp.dest(options.styles));

		// .pipe($.svgSprite({
		// 	mode: {
		// 		css: {
		// 			dest:		'.',
		// 			bust:		!options.is.build,
		// 			sprite:		'sprite.svg',
		// 			layout:		'vertical',
		// 			prefix:		'$',
		// 			dimensions: true,
		// 			render:     {
		// 				styl: {
		// 					dest: 'sprite.scss'
		// 				}
		// 			}
		// 		}
		// 	}
		// }))

		// .pipe($.if('*.scss', gulp.dest('tmp/styles'), gulp.dest(options.css)))

		// .pipe($.debug({'title': options.taskName}))

		// .pipe(gulp.dest(options.app))

		// .pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

		callback();
	};
	
};
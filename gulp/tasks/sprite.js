'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');
const spritesmith 	= require('gulp.spritesmith');
const errorHandler 	= require("../utils/errorHandler.js");

        // svg2png: require('gulp-svg2png'),
        
module.exports = function(options) {

	return function(callback) {
		
		let spriteData = gulp.src(options.src).pipe(spritesmith({
			imgName: options.sprite.image,
			cssName: options.sprite.style
		}));

		// options.imgPath = imgPath + options.imgName;
		// options.retinaImgPath = imgPath + options.retinaImgName;
		// options.cssName = options.cssName.replace(/\.css$/, '.styl');
		// options.cssFormat = 'stylus';
		// options.cssTemplate = cssTemplate;
		// options.algorithm = 'binary-tree';
		// options.padding = 8;

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

// gulp.task('svgSprite', function () {
// 	return gulp.src(paths.sprite.src)
// 		.pipe($.svgSprite({
// 			shape: {
// 				spacing: {
// 					padding: 5
// 				}
// 			},
// 			mode: {
// 				css: {
// 					dest: "./",
// 					layout: "diagonal",
// 					sprite: paths.sprite.svg,
// 					bust: false,
// 					render: {
// 						scss: {
// 							dest: "css/src/_sprite.scss",
// 							template: "build/tpl/sprite-template.scss"
// 						}
// 					}
// 				}
// 			},
// 			variables: {
// 				mapname: "icons"
// 			}
// 		}))
// 		.pipe(gulp.dest(basePaths.dest));
// });

// gulp.task('pngSprite', ['svgSprite'], function() {
// 	return gulp.src(basePaths.dest + paths.sprite.svg)
// 		.pipe($.svg2png())
// 		.pipe($.size({
// 			showFiles: true
// 		}))
// 		.pipe(gulp.dest(paths.images.dest));
// });

// gulp.task('sprite', ['pngSprite']);


// import gulp from 'gulp';
// import plumber from 'gulp-plumber';
// import spritesmith from 'gulp.spritesmith-multi';
// import checkIconsInDir from 'spritesmith-dir-checker';
// import merge from 'merge-stream';
// import path from 'path';
// import errorHandler from 'gulp-plumber-error-handler';

// const cwd = path.join(__dirname, '..');
// const spritesDirPath = 'app/sprites';
// const imgPath = '../images/sprites/';
// const tmplName = 'stylus_retina.template.handlebars';
// const tmplPath = '../node_modules/spritesmith-stylus-retina-template';
// const cssTemplate = path.join(__dirname, tmplPath, tmplName);

// gulp.task('sprites', () => {
// 	const canDoNext = checkIconsInDir(cwd, spritesDirPath);

// 	if (!canDoNext) {
// 		return;
// 	}

// 	const spriteData = gulp.src(['app/sprites/**/*.png', '!app/sprites/*.png'])
// 		.pipe(plumber({errorHandler: errorHandler(`Error in 'sprites' task`)}))
// 		.pipe(spritesmith({
// 			spritesmith(options) {
// 				options.imgPath = imgPath + options.imgName;
// 				options.retinaImgPath = imgPath + options.retinaImgName;
// 				options.cssName = options.cssName.replace(/\.css$/, '.styl');
// 				options.cssFormat = 'stylus';
// 				options.cssTemplate = cssTemplate;
// 				options.algorithm = 'binary-tree';
// 				options.padding = 8;

// 				return options;
// 			}
// 		}));

// 	const imgStream = spriteData.img.pipe(gulp.dest('dist/assets/images/sprites'));
// 	const styleStream = spriteData.css.pipe(gulp.dest('app/styles/sprites'));

// 	return merge(imgStream, styleStream);
// });

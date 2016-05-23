'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');
const clean 		= require("../utils/clean.js");
const errorHandler 	= require("../utils/errorHandler.js");
const classPrefix 	= require('gulp-class-prefix');
const bulkSass 		= require('gulp-sass-bulk-import');
const immutableCss	= require('immutable-css');
const reporter 		= require('postcss-reporter');
const gcmq 			= require('gulp-group-css-media-queries');

module.exports = function(options) {
	return function(callback) {
		// clean(options.app, options.is.build);
		
		let uncssFiles = [
			options.app + '*.html',
			options.app + '**/*.html'
		];

		let uncssIgnore = [
			'#added_at_runtime',
			/^#js/,
			new RegExp('^meta\..*'),
			new RegExp('^\.is-.*'),
			'.visited'
		];

		gulp.src(options.src)

			.pipe($.plumber({errorHandler: errorHandler}))

			.pipe($.debug({'title': options.taskName}))
			
			.pipe($.if(!options.is.build, $.sourcemaps.init()))
			
			.pipe(bulkSass())
			
			.pipe($.sass())
			
			.pipe($.pixrem())

			.pipe($.if(options.is.prefix, classPrefix(options.prefix, { ignored: [/\.js-/, /\.j-/, /\.is-/, '.active', '.current', '.animate', '.clearfix', '.inner', '.show', '.hide'] })))

			// .pipe($.postcss([
			//     immutableCss({
			// 		strict: true
			//     }),
			//     reporter()
			// ]))

			.pipe($.concat('main.css'))

			.pipe($.if(!options.is.build, gcmq()))
			
			.pipe($.if(
				options.is.uncss,
				$.uncss({
					html: uncssFiles,
					ignore: uncssIgnore,
					ignoreSheets : [/fonts.googleapis/],
					timeout: 1500
				})
			))

			.pipe($.autoprefixer({
				browsers: ['last 17 versions'],
				cascade: false
			}))

			.pipe($.if(
				options.is.build,
				$.csscomb({
					"tab-size": 4,
					"color-shorthand": true,
					"space-after-colon": 1,
					"space-after-combinator": 1,
					"space-before-opening-brace": 1,
					"sort-order": [
						[
							"content", "position", "left", "right", "top", "bottom", "z-index"
						],
						[
							"width", "height", "margin", "padding"
						],
						[
							"background", "background-color", "background-image", "background-repeat", "background-position", "background-attachment", "background-size", "border"
						]
					]
				})
			))

			.pipe($.if(
				!options.is.build,
				gulp.dest(options.app)
			))

			.pipe($.if(
				options.is.build,
				$.cssnano({
					zindex: false,
					autoprefixer: false,
					normalizeCharset: true,
					convertValues: { length: false },
					colormin: true
				})
			))

			.pipe($.rename({suffix: '.min'}))

			.pipe($.debug({'title': options.taskName}))

			.pipe($.if(!options.is.build, $.sourcemaps.write()))

			.pipe(gulp.dest(options.app))

			.pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

		callback();
	};
};
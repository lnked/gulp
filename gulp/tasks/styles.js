'use strict';

// Инициализируем плагины
const gulp			= require('gulp');					// Собственно Gulp JS
const newer			= require('gulp-newer');			// Passing through only those source files that are newer than corresponding destination files
const concat		= require('gulp-concat');			// Склейка файлов
const notify		= require('gulp-notify');			// Нотификатор
const plumber		= require('gulp-plumber');			// Перехватчик ошибок
const wrapper		= require('gulp-wrapper');			// Добавляет к файлу текстовую шапку и/или подвал
const rename		= require('gulp-rename');

const inlineCss		= require('gulp-inline-css');
const gutil			= require('gulp-util');
const gulpif		= require('gulp-if');

const nano			= require('gulp-cssnano');
const sass			= require('gulp-sass');				// Препроцессор для компиляции в css
const uncss			= require('gulp-uncss');			// Плагин оставляет только используемые стили
const pixrem		= require('gulp-pixrem');			// Переводит пиксели в ремы
const prefixer		= require('gulp-autoprefixer');		// Присваивает префиксы
const csscomb		= require('gulp-csscomb');

// const del			= require('del');					// Удаление файлов и папок

gulp.task('styles1', function(callback){
	// clean(path.build.styles, is.build);

	gulp.src(path.assets.styles)
		.pipe(plumber({errorHandler: errorHandler}))
		
		.pipe(sass())

		.pipe(concat('main.css'))

		.pipe(gulpif(
			is.uncss,
			uncss({
				html: uncssFiles,
				ignore: uncssIgnore,
				timeout: 1000,
			})
		))

		.pipe(prefixer({
			browsers: ['last 17 versions'],
			cascade: false
		}))

		.pipe(pixrem())
		
		.pipe(gulpif(
			is.build,
			csscomb({
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

		.pipe(gulp.dest(path.build.styles))

		.pipe(gulpif(
			is.build,
			nano({
				zindex: false,
				autoprefixer: false,
				normalizeCharset: true,
				convertValues: { length: false },
				colormin: true
			})
		))

		.pipe(rename({suffix: '.min'}))
		
		.pipe(gulp.dest(path.build.styles))

		.pipe(notify({ message: 'Update css complete', onLast: true }));

	callback();
});
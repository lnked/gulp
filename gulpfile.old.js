'use strict';

// Инициализируем плагины
const gulp			= require('gulp');					// Собственно Gulp JS
const watch			= require('gulp-watch');
const newer			= require('gulp-newer');			// Passing through only those source files that are newer than corresponding destination files
const concat		= require('gulp-concat');			// Склейка файлов
const notify		= require('gulp-notify');			// Нотификатор
const plumber		= require('gulp-plumber');			// Перехватчик ошибок
const wrapper		= require('gulp-wrapper');			// Добавляет к файлу текстовую шапку и/или подвал
const rename		= require('gulp-rename');
const Pageres		= require('pageres');
const open			= require('gulp-open');
const connect		= require('gulp-connect');
const debug			= require('gulp-debug');
const sourcemaps 	= require('gulp-sourcemaps');
const mocha 		= require('gulp-mocha');

const inlineCss		= require('gulp-inline-css');
const htmlhint		= require('gulp-htmlhint');
const gutil			= require('gulp-util');
const gulpif		= require('gulp-if');

const nano			= require('gulp-cssnano');
const sass			= require('gulp-sass');				// Препроцессор для компиляции в css
const uncss			= require('gulp-uncss');			// Плагин оставляет только используемые стили
const pixrem		= require('gulp-pixrem');			// Переводит пиксели в ремы
const prefixer		= require('gulp-autoprefixer');		// Присваивает префиксы
const csscomb		= require('gulp-csscomb');

const uglify		= require('gulp-uglify');			// Минификация JS
const typescript	= require('gulp-typescript');
const coffee		= require('gulp-coffee');
const eslint		= require('gulp-eslint');
const webpack		= require('gulp-webpack');

const react			= require('gulp-react');			// React

const standards		= require('gulp-webstandards');
const ghPages		= require('gulp-gh-pages');

const svgSprite 	= require('gulp-svg-sprite');
const webp			= require('gulp-webp');
const imagemin		= require('gulp-imagemin');			// Минификация изображений
const svgmin		= require('gulp-svgmin');
const svgstore		= require('gulp-svgstore');
const tinypng		= require('gulp-tinypng-compress');
const svgo			= require('imagemin-svgo');
const gifsicle		= require('imagemin-gifsicle');
const prettify		= require('gulp-prettify');
const fileinclude	= require('gulp-file-include');
const del			= require('del');					// Удаление файлов и папок
const browserSync 	= require('browser-sync').create();

gulp.task('styles:svg', function(callback){
	gulp.src(path.assets.images + '.svg')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(svgSprite({
			mode: {
				css: {
					dest:		'.',
					bust:		!is.build,
					sprite:		'sprite.svg',
					layout:		'vertical',
					prefix:		'$',
					dimensions: true,
					render:     {
						styl: {
							dest: 'sprite.scss'
						}
					}
				}
			}
		}))
		.pipe(gulpIf('*.scss', gulp.dest('tmp/styles'), gulp.dest('public/styles')));

	callback();
});

gulp.task('svgstore', function(callback){
	gulp.src(path.assets.images + '.svg')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(debug())
		.pipe(svgmin(function (file) {
			var prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [{
					cleanupIDs: {
						prefix: prefix + '-',
						minify: true
					}
				}]
			}
		}))
		.pipe(svgstore())
		.pipe(debug())
		.pipe(gulp.dest('test/dest'));

	callback();
});

gulp.task('images:gif', function(callback){

	gulp.src(path.assets.images + '.gif')
		.pipe(debug())
		.pipe(newer(path.build.images))
		.pipe(debug())
		.pipe(gulp.dest(path.build.images));

	callback();
});

gulp.task('images', function(callback){
	clean(path.build.images, is.build);
	
	gulp.series('images:gif');

	gulp.src(path.assets.images + '.{svg,png,jpg,jpeg}')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(debug({title: 'images'}))
		.pipe(newer(path.build.images))
		// .pipe(webp())
		.pipe(gulpif(
			is.build,
			imagemin({
				optimizationLevel: 3,
				progressive: true,
				svgoPlugins: [
					{removeTitle:true},
					{removeDesc:true},
					{removeViewBox:true},
					{removeDoctype:true},
					{removeMetadata:true},
					{removeComments:true},
					{removeUselessDefs:true},
					{removeXMLProcInst:true},
					{removeDimensions:true},
					{
						convertColors: {
							names2hex: true,
							rgb2hex: true
						}
					},
					{removeUselessStrokeAndFill:false}
				],
				use: [svgo(), gifsicle({interlaced: true})]
			})
		))
		.pipe(debug({title: 'images'}))
		.pipe(gulp.dest(path.build.images));

	callback();
});

gulp.task('modernizr', function(callback){
	gulp.src(path.modernizr)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(gulp.dest(path.build.scripts));

	callback();
});


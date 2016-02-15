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

const webserver		= require('gulp-webserver');

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

/**
 * Обработчик ошибок.
 * @param err
 */
var errorHandler = function(err) {
	try {
		gutil.log(gutil.colors.green('FileName:'), gutil.colors.blue(err.fileName));
		gutil.log(gutil.colors.red.bold('Error:'), gutil.colors.red(err.message));
		gutil.log(gutil.colors.cyan('lineNumber:'), gutil.colors.magenta(err.lineNumber));
		gutil.log(gutil.colors.black('Plugin:'), gutil.colors.green(err.plugin));
	}
	catch(e) {}
}

/**
 * Очищаем папку с компилированным проектом.
 * @param path
 * @param build
 */
function clean(path, build)
{
	if (build === true)
	{
		del([path + '*']);
	}
}
// .pipe(debug({title: 'unicorn:'}))

gulp.task('build', gulp.series(
    'isbuild',
    
);


// gulp.task('build', gulp.parallel('html', 'styles', 'scripts', 'images', 'favicon', 'fonts', 'json', 'extras'));

gulp.task('default', gulp.series('watch'));
// gulp.task('default', gulp.series('watch', gulp.parallel('serve')));

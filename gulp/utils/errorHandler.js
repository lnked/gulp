const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');

/**
 * Очищаем папку с компилированным проектом.
 * @param path
 * @param build
 */
module.exports = function(err) {
	try {
		$.util.log($.util.colors.green('FileName:'), $.util.colors.blue(err.fileName));
		$.util.log($.util.colors.red.bold('column:'), $.util.colors.red(err.column));
		$.util.log($.util.colors.red.bold('line:'), $.util.colors.red(err.line));
		$.util.log($.util.colors.red.bold('Error:'), $.util.colors.red(err.message));
		$.util.log($.util.colors.cyan('lineNumber:'), $.util.colors.magenta(err.lineNumber));
		$.util.log($.util.colors.black('Plugin:'), $.util.colors.green(err.plugin));
	}
	catch(e) {}
};
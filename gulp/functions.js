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
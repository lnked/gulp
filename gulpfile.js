'use strict';

const gulp		= require('gulp');
const gutil		= require('gulp-util');

const tasks		= './gulp/tasks/';
const config	= require('./gulp/config.js');

const app 		= config.app;
const asp		= config.asp;
const src		= config.src;
const path		= config.path;

let is = {
	build: false,
	email: false,
	watch: false,
	uncss: false,
	webpack: false,
	typescript: false,
	coffee: false
};

if (typeof gutil.env !== 'undefined')
{
	for (let o in gutil.env)
	{
		if (typeof(is[o]) !== 'undefined')
		{
			is[o] = gutil.env[o];
		}
	}
}

function lazyRequireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;

	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		return task(callback);
	});
}

lazyRequireTask('template', tasks + 'template', {
	src: path.assets.template,
	app: path.build.template,
	is:  is
});

lazyRequireTask('styles', tasks + 'styles', {
	src: path.assets.styles,
	app: path.build.styles,
	is:  is
});

// ================ Copy ================ //

lazyRequireTask('extras', tasks + 'copy', {
	src: path.extras,
	app: app
});

lazyRequireTask('json', tasks + 'copy', {
	src: path.assets.json,
	app: path.build.json,
	is:  is
});

lazyRequireTask('favicon', tasks + 'copy', {
	src: path.assets.favicon,
	app: path.build.favicon,
	is:  is
});

lazyRequireTask('fonts', tasks + 'copy', {
	src: path.assets.fonts,
	app: path.build.fonts,
	is:  is
});

// lazyRequireTask('assets', './tasks/assets', {
// 	src: 'frontend/assets/**',
// 	dst: 'public'
// });

// gulp.task('build', gulp.series(
// 	'clean',
// 	gulp.parallel('styles', 'assets'))
// );

// gulp.task('watch', function() {
// 	gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
// 	gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
// });

// lazyRequireTask('serve', './tasks/serve', {
// 	src: 'public'
// });

// gulp.task('dev',
// 	gulp.series('build', gulp.parallel('watch', 'serve'))
// );

// lazyRequireTask('lint', './tasks/lint', {
// 	cacheFilePath: process.cwd() + '/tmp/lintCache.json',
// 	src: 'frontend/**/*.js'
// });

gulp.task('build', function(callback){

});
gulp.task('webserver', function(callback){

});

gulp.task('isbuild', function(callback){
	is.build = true;
	callback();
});

gulp.task('watch', function(){
	is.watch = true;

	var x;
	for (x in path.watch)
	{
		(function(key){
			watch(path.watch[key], gulp.series(key));
		})(x);
	}
});

// gulp.task('build',
// 	gulp.series('isbuild',
// 		gulp.parallel('template', 'styles', 'scripts:vendor', 'scripts:app', 'images', 'favicon', 'fonts', 'json', 'extras')
// 	)
// );

gulp.task('default',
	gulp.series('build', gulp.parallel('watch', 'webserver'))
);
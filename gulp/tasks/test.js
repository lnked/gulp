gulp.task('unitest', function(callback){
	gulp.src('test.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));

	callback();
});
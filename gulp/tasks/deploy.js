gulp.task('deploy', function(callback){
	return gulp.src(app + '/**/*').pipe(ghPages());

	callback();
});
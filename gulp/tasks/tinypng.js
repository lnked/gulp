
gulp.task('tinypng', function(callback){
	gulp.src(path.assets.images + '.png')
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(debug({title: 'tinypng'}))
		.pipe(tinypng({
			key: 'eGm6p86Xxr4aQ3H7SvfoogEUKOwgBQc3',
			sigFile: 'images/.tinypng-sigs',
			log: true
		}))
		.pipe(debug({title: 'tinypng'}))
		.pipe(gulp.dest(path.build.images));

	callback();
});
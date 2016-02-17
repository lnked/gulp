

gulp.task('shot', function(callback){
	var pageres = new Pageres({delay: 2})
		.src('yeoman.io', ['480x320', '1024x768', 'iphone 5s'], { crop: true })
		.src('todomvc.com', ['1280x1024', '1920x1080'])
		.dest(app);

	pageres.run(function (err) {
		console.log('done');
	});

	callback();
});
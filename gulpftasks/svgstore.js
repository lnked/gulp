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
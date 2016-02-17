
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
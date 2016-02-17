
gulp.task('html', function(callback){
	gulp.src(path.assets.html)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(debug())
		
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))

		.pipe(gulpif(
			is.email,
			inlineCss({
				applyStyleTags: true,
				applyLinkTags: true,
				removeStyleTags: true,
				removeLinkTags: true
		   })
		))

		.pipe(gulpif(
			is.build,
			prettify({
				indent_size: 4,
				indent_char: ' ',
				brace_style: 'expand',
				indent_handlebars: false,
				indent_inner_html: false,
				preserve_newlines: false,
				max_preserve_newlines: 1,
				unformatted: ['pre', 'code']
			})
		))

		.pipe(gulpif(
			is.watch,
			htmlhint({
				"attr-value-double-quotes": false,
				"tagname-lowercase": false,
				"attr-lowercase": false,
				"doctype-first": false,
				"id-unique": true,
				"tag-pair": false,
				"attr-no-duplication": true,
				"spec-char-escape": false,
				"src-not-empty": false
			})
		))

		.pipe(gulpif(
			is.watch,
			htmlhint.reporter()
		))

		.pipe(gulp.dest(path.build.html))

		.pipe(debug())
		.pipe(notify({ message: 'Update HTML' }));

	callback();
});
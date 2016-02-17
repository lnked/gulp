
gulp.task('scripts:vendor', function(callback){
	clean(path.build.scripts, is.build);

	gulp.src(path.assets.vendors)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(debug())
		
		.pipe(wrapper({
			header: '\n// ${filename}\n\n',
			footer: '\n'
		}))

		.pipe(gulpif(
			is.webpack,
			webpack({
				bail: false,
				debug: true,
				watch: true,
				module: {
					loaders: [{
						test: /\.css$/,
						loader: 'style!css'
					}]
				}})
			))
		
		.pipe(concat('vendors.js'))
		.pipe(rename({suffix: '.min'}))

		.pipe(gulpif(
			is.coffee, coffee()
		))
		
		.pipe(gulpif(
			is.typescript,
			typescript({
				noImplicitAny: true,
				declaration: true,
				noExternalResolve: true
			})
		))

		.pipe(uglify())
		
		.pipe(gulp.dest(path.build.scripts))
		
		.pipe(debug())
		.pipe(notify({ message: 'Update vendors complete', onLast: true }));

	callback();
});

gulp.task('scripts:app', function(callback){
	gulp.src(path.assets.scripts)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(gulpif(!is.build, sourcemaps.init()))
		.pipe(debug())

		.pipe(react())

		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())

		.pipe(wrapper({
			header: '\n// ${filename}\n\n',
			footer: '\n'
		}))

		.pipe(gulpif(
			is.webpack,
			webpack({
				bail: false,
				debug: true,
				watch: true,
				module: {
					loaders: [{
						test: /\.css$/,
						loader: 'style!css'
					}]
				}})
			))
		
		.pipe(concat('main.js'))
		.pipe(gulp.dest(path.build.scripts))

		.pipe(rename({suffix: '.min'}))

		.pipe(gulpif(
			is.coffee,
			coffee()
		))
		
		.pipe(gulpif(
			is.typescript,
			typescript({
				noImplicitAny: true,
				declaration: true,
				noExternalResolve: true
			})
		))

		.pipe(gulpif(
			is.build,
			uglify()
		))
		
		.pipe(gulpif(!is.build, sourcemaps.write()))
		.pipe(gulp.dest(path.build.scripts))
		
		.pipe(debug())
		.pipe(notify({ message: 'Update scripts complete', onLast: true }));

	callback();
});
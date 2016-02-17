'use strict';

// Инициализируем плагины
const gulp			= require('gulp');					// Собственно Gulp JS
const watch			= require('gulp-watch');
const newer			= require('gulp-newer');			// Passing through only those source files that are newer than corresponding destination files
const concat		= require('gulp-concat');			// Склейка файлов
const notify		= require('gulp-notify');			// Нотификатор
const plumber		= require('gulp-plumber');			// Перехватчик ошибок
const wrapper		= require('gulp-wrapper');			// Добавляет к файлу текстовую шапку и/или подвал
const rename		= require('gulp-rename');
const Pageres		= require('pageres');
const open			= require('gulp-open');
const connect		= require('gulp-connect');
const debug			= require('gulp-debug');
const sourcemaps 	= require('gulp-sourcemaps');

const inlineCss		= require('gulp-inline-css');
const htmlhint		= require('gulp-htmlhint');
const gutil			= require('gulp-util');
const gulpif		= require('gulp-if');

const nano			= require('gulp-cssnano');
const sass			= require('gulp-sass');				// Препроцессор для компиляции в css
const uncss			= require('gulp-uncss');			// Плагин оставляет только используемые стили
const pixrem		= require('gulp-pixrem');			// Переводит пиксели в ремы
const prefixer		= require('gulp-autoprefixer');		// Присваивает префиксы
const csscomb		= require('gulp-csscomb');

const uglify		= require('gulp-uglify');			// Минификация JS
const typescript	= require('gulp-typescript');
const coffee		= require('gulp-coffee');
const eslint		= require('gulp-eslint');
const webpack		= require('gulp-webpack');

const webserver		= require('gulp-webserver');

const react			= require('gulp-react');			// React

const standards		= require('gulp-webstandards');
const ghPages		= require('gulp-gh-pages');

const svgSprite 	= require('gulp-svg-sprite');
const webp			= require('gulp-webp');
const imagemin		= require('gulp-imagemin');			// Минификация изображений
const svgmin		= require('gulp-svgmin');
const svgstore		= require('gulp-svgstore');
const tinypng		= require('gulp-tinypng-compress');
const svgo			= require('imagemin-svgo');
const gifsicle		= require('imagemin-gifsicle');
const prettify		= require('gulp-prettify');
const fileinclude	= require('gulp-file-include');
const del			= require('del');					// Удаление файлов и папок

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

const config = require('./gulp/config.js');

const app 	= config.app;
const asp 	= config.asp;
const src 	= config.src;
const path 	= config.path;

let is = {
	build: false,
	email: false,
	watch: false,
	uncss: false,
	webpack: false,
	typescript: false,
	coffee: false
};
let uncssFiles = [
	path.build.html + '*.html',
	path.build.html + '**/*.html'
];
let uncssIgnore = [ /^#js/ ];

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

// require('./gulp/tasks/styles.js');

gulp.task('html', function(callback){
	gulp.src(path.assets.html)
		.pipe(debug())
		.pipe(plumber({errorHandler: errorHandler}))
		
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

gulp.task('styles', function(callback){
	clean(path.build.styles, is.build);

	gulp.src(path.assets.styles)
		.pipe(debug())
		.pipe(gulpif(!is.build, sourcemaps.init()))
		.pipe(plumber({errorHandler: errorHandler}))
		
		.pipe(sass())

		.pipe(concat('main.css'))

		.pipe(gulpif(
			is.uncss,
			uncss({
				html: uncssFiles,
				ignore: uncssIgnore,
				timeout: 1000,
			})
		))

		.pipe(prefixer({
			browsers: ['last 17 versions'],
			cascade: false
		}))

		.pipe(pixrem())
		
		.pipe(gulpif(
			is.build,
			csscomb({
				"tab-size": 4,
				"color-shorthand": true,
				"space-after-colon": 1,
				"space-after-combinator": 1,
				"space-before-opening-brace": 1,
				"sort-order": [
					[
						"content", "position", "left", "right", "top", "bottom", "z-index"
					],
					[
						"width", "height", "margin", "padding"
					],
					[
						"background", "background-color", "background-image", "background-repeat", "background-position", "background-attachment", "background-size", "border"
					]
				]
			})
		))

		.pipe(gulp.dest(path.build.styles))

		.pipe(gulpif(
			is.build,
			nano({
				zindex: false,
				autoprefixer: false,
				normalizeCharset: true,
				convertValues: { length: false },
				colormin: true
			})
		))

		.pipe(rename({suffix: '.min'}))
	
		.pipe(gulpif(!is.build, sourcemaps.write()))
		.pipe(debug())
		.pipe(gulp.dest(path.build.styles))

		.pipe(notify({ message: 'Update css complete', onLast: true }));

	callback();
});

gulp.task('scripts:vendor', function(callback){
	clean(path.build.scripts, is.build);

	gulp.src(path.assets.vendors)
		.pipe(debug())
		.pipe(plumber({errorHandler: errorHandler}))

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
		.pipe(gulpif(!is.build, sourcemaps.init()))
		.pipe(debug())
		.pipe(plumber({errorHandler: errorHandler}))

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

gulp.task('svgstore', function(callback){
	gulp.src(path.assets.images + '.svg')
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

gulp.task('images:gif', function(callback){

	gulp.src(path.assets.images + '.gif')
		.pipe(debug())
		.pipe(newer(path.build.images))
		.pipe(debug())
		.pipe(gulp.dest(path.build.images));

	callback();
});

gulp.task('images', function(callback){
	clean(path.build.images, is.build);
	
	gulp.series('images:gif');

	gulp.src(path.assets.images + '.{svg,png,jpg,jpeg}')
		.pipe(debug())
		.pipe(newer(path.build.images))
		// .pipe(webp())
		.pipe(gulpif(
			is.build,
			imagemin({
				optimizationLevel: 3,
				progressive: true,
				svgoPlugins: [
					{removeTitle:true},
					{removeDesc:true},
					{removeViewBox:true},
					{removeDoctype:true},
					{removeMetadata:true},
					{removeComments:true},
					{removeUselessDefs:true},
					{removeXMLProcInst:true},
					{removeDimensions:true},
					{
						convertColors: {
							names2hex: true,
							rgb2hex: true
						}
					},
					{removeUselessStrokeAndFill:false}
				],
				use: [svgo(), gifsicle({interlaced: true})]
			})
		))
		.pipe(debug())
		.pipe(gulp.dest(path.build.images));

	callback();
});


gulp.task('favicon', function(callback){
	clean(path.build.favicon, is.build);
	
	gulp.src(path.assets.favicon)
		.pipe(debug())
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(newer(path.build.favicon))
		.pipe(gulp.dest(path.build.favicon))
		.pipe(debug())
		.pipe(notify({ message: 'Favicon task complete', onLast: true }));

	callback();
});

gulp.task('fonts', function(callback){
	clean(path.build.fonts, is.build);
	
	gulp.src(path.assets.fonts)
		.pipe(debug())
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(newer(path.build.fonts))
		.pipe(gulp.dest(path.build.fonts))
		.pipe(debug())
		.pipe(notify({ message: 'Fonts task complete', onLast: true }));

	callback();
});

gulp.task('json', function(callback){
	clean(path.build.json, is.build);

	gulp.src(path.assets.json)
		.pipe(debug())
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(gulp.dest(path.build.json))
		.pipe(debug())
		.pipe(notify({ message: 'Json task complete', onLast: true }));

	callback();
});

gulp.task('extras', function(callback){
	gulp.src(path.extras, {cwd: asp})
		.pipe(debug())
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(debug())
		.pipe(gulp.dest(app));

	callback();
});

gulp.task('modernizr', function(callback){
	gulp.src(path.modernizr)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(gulp.dest(path.build.scripts));

	callback();
});

gulp.task('tinypng', function(callback){
	gulp.src(path.assets.images + '.png')
		.pipe(debug())
		.pipe(tinypng({
			key: 'eGm6p86Xxr4aQ3H7SvfoogEUKOwgBQc3',
			sigFile: 'images/.tinypng-sigs',
			log: true
		}))
		.pipe(debug())
		.pipe(gulp.dest(path.build.images));

	callback();
});

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

gulp.task('webstandards', function(){
	return gulp.src(app + '/**/*').pipe(standards());

	callback();
});

gulp.task('deploy', function(callback){
	return gulp.src(app + '/**/*').pipe(ghPages());

	callback();
});

gulp.task('watch', function(callback){
	is.watch = true;

	var x;
	for (x in path.watch)
	{
		(function(key){
			watch(path.watch[key], gulp.series(key));
		})(x);
	}

	callback();
});

gulp.task('serve', function(callback){
	return gulp.src(app)
		.pipe(webserver({
			livereload: {
				enable: false,
				filter: function(filename) {
					return true;
				}
			},
			port: 8000,
			fallback: 'index.html'
		}));

	callback();
});

gulp.task('isbuild', function(callback){
	is.build = true;

	callback();
});

gulp.task('build', gulp.series('isbuild', gulp.parallel('html', 'styles', 'scripts:vendor', 'scripts:app', 'images', 'favicon', 'fonts', 'json', 'extras')));

gulp.task('default', gulp.series('watch'));

// var config = {
//     port: 9005,
//     devBaseUrl: 'http://localhost',
//     paths: {
//         html: './src/*.html',
//         js: './src/**/*.js',
//         css: [
//             'node_modules/bootstrap/dist/css/bootstrap.min.css',
//             'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
//         ],
//         dist: './dist',
//         mainJs: './src/main.js'
//     }
// };

// gulp.task('styles:svg', function() {
// 	return
// 		gulp.src(path.assets.images + '.svg')
// 			.pipe(svgSprite({
// 				mode: {
// 					css: {
// 						dest:		'.',
// 						bust:		!is.build,
// 						sprite:		'sprite.svg',
// 						layout:		'vertical',
// 						prefix:		'$',
// 						dimensions: true,
// 						render:     {
// 							styl: {
// 								dest: 'sprite.scss'
// 							}
// 						}
// 					}
// 				}
// 			}))
// 			.pipe(gulpIf('*.scss', gulp.dest('tmp/styles'), gulp.dest('public/styles')));
// });

// gulp.task('open', ['connect'], function() {
// 	gulp.src('dist/index.html')
// 		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
// });

// gulp.task('connect', function() {
// 	connect.server({
// 		root: ['dist'],
// 		port: config.port,
// 		base: config.devBaseUrl,
// 		livereload: true
// 	});
// });

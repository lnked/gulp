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
let errorHandler = function(err) {
	try {
		gutil.log(gutil.colors.green('FileName:'), gutil.colors.blue(err.fileName));
		gutil.log(gutil.colors.red.bold('Error:'), gutil.colors.red(err.message));
		gutil.log(gutil.colors.cyan('lineNumber:'), gutil.colors.magenta(err.lineNumber));
		gutil.log(gutil.colors.black('Plugin:'), gutil.colors.green(err.plugin));
	}
	catch(e) {}
}

// Очищаем папку с компилированным проектом
function clean(path, build)
{
	if (build === true) {
		del([path + '*']);
	}
}

const config = require('./gulp.config.js');

const app 	= config.app;
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

gulp.task('webserver', function() {
	gulp.src(app)
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
});

// Копируем html
gulp.task('html', function() {
	
	gulp.src(path.assets.html)
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

		.pipe(notify({ message: 'Update HTML' }));
});

// Собираем Sass
gulp.task('styles', function() {
	clean(path.build.styles, is.build);

	gulp.src(path.assets.styles)
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
		
		.pipe(gulp.dest(path.build.styles))

		.pipe(notify({ message: 'Update css complete', onLast: true }));
});

// Собираем JS
gulp.task('scripts', function() {
	clean(path.build.scripts, is.build);

	gulp.src(path.assets.scripts)
		.pipe(plumber({errorHandler: errorHandler}))

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
		
		.pipe(react())
		
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
		
		.pipe(gulp.dest(path.build.scripts))
		
		.pipe(notify({ message: 'Update scripts complete', onLast: true }));
});

gulp.task('svgstore', function () {
	return gulp
		.src(path.assets.images + '.{svg}')
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
		.pipe(gulp.dest('test/dest'));
});

// Копируем и минимизируем изображения
gulp.task('images_gif', function() {
	gulp.src(path.assets.images + '.gif')
		.pipe(newer(path.build.images))
		.pipe(gulp.dest(path.build.images));
});

gulp.task('images', function() {
	clean(path.build.images, is.build);
	
	gulp.start('images_gif');

	gulp.src(path.assets.images + '.{svg,png,jpg,jpeg}')
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

		.pipe(gulp.dest(path.build.images));
});

gulp.task('tinypng', function () {
	gulp.src(path.assets.images + '.{png,jpg,jpeg}')
		.pipe(tinypng({
			key: 'eGm6p86Xxr4aQ3H7SvfoogEUKOwgBQc3',
			sigFile: 'images/.tinypng-sigs',
			log: true
		}))
		.pipe(gulp.dest(path.build.images));
});

// Копируем json
gulp.task('json', function() {
	clean(path.build.json, is.build);

	gulp.src(path.assets.json)
		.pipe(plumber({errorHandler: errorHandler}))

		.pipe(gulp.dest(path.build.json))

		.pipe(notify({ message: 'Json task complete', onLast: true }));
});

// Копируем шрифты
gulp.task('fonts', function () {
	clean(path.build.fonts, is.build);
	
	gulp.src(path.assets.fonts)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(newer(path.build.fonts))
		.pipe(gulp.dest(path.build.fonts))
		.pipe(notify({ message: 'Fonts task complete', onLast: true }));
});

// Копируем favicon
gulp.task('favicon', function () {
	clean(path.build.favicon, is.build);
	
	gulp.src(path.assets.favicon)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(newer(path.build.favicon))
		.pipe(gulp.dest(path.build.favicon))
		.pipe(notify({ message: 'Favicon task complete', onLast: true }));
});

// Делаем скриншот
gulp.task('shot', function () {
	var pageres = new Pageres({delay: 2})
		.src('yeoman.io', ['480x320', '1024x768', 'iphone 5s'], { crop: true })
		.src('todomvc.com', ['1280x1024', '1920x1080'])
		.dest(app);

	pageres.run(function (err) {
		console.log('done');
	});
});

gulp.task('modernizr', function() {
	gulp.src(path.modernizr)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(gulp.dest(path.build.scripts));
});

gulp.task('extras', function() {

	gulp.src(path.extras, {cwd: src})
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(gulp.dest(app));
});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

// Запуск слежки за изминениями в проекте (gulp watch)
gulp.task('watch', function () {
	is.watch = true;
	
	var x;
	for (x in path.watch)
	{
		(function(key){
			watch(path.watch[key], function() {
				gulp.start(key);
			});
		})(x);
	}
});

gulp.task('webstandards', function(){
	return gulp.src(app + '/**/*').pipe(standards());
});

gulp.task('deploy', function() {
	return gulp.src(app + '/**/*').pipe(ghPages());
});

// Сборка проекта
gulp.task('build', function() {
	is.build = true;
	
	if (gutil.env.coffee === true)
	{
		is.coffee = true;
	}
	
	gulp.start('html');
	gulp.start('styles');
	gulp.start('scripts');
	gulp.start('images');
	gulp.start('favicon');
	gulp.start('fonts');
	gulp.start('json');
	gulp.start('extras');
	// gulp.start('webstandards');
	// gulp.start('open');
});

// Запускаем слежку по умолчанию
gulp.task('default', function(){
	if (gutil.env.coffee === true)
	{
		is.coffee = true;
	}

	gulp.start('watch');
});
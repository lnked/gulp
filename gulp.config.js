const app = './dist/';
const src = './assets/';

exports.app  = app;
exports.src  = src;
exports.path = {
	build: {
		html:			app,
		scripts:		app + 'js',
		styles:			app + 'css',
		images:			app + 'images',
		favicon:		app + 'favicon',
		fonts:			app + 'fonts',
		json:			app + 'json'
	},
	assets: {
		html:           [src + 'template/*.html'],
		scripts:        [src + 'scripts/_jquery.js', src + 'scripts/**/*.js'],
		styles:         [src + 'styles/*.scss'],
		images:         [src + 'images/**/*'],
		favicon:        [src + 'favicon/**/*.*'],
		fonts:          [src + 'fonts/**/*.*'],
		json:           [src + 'json/**/*.json']
	},
	watch: {
		html:           [src + 'template/*.html', src + 'template/**/*.html'],
		scripts:        [src + 'scripts/**/*.js'],
		styles:         [src + 'styles/**/*.scss'],
		images:         [src + 'images/**/*.*'],
		favicon:        [src + 'favicon/**/*.*'],
		fonts:          [src + 'fonts/**/*.*'],
		json:           [src + 'json/**/*.json']
	},
	extras: ['favicon.ico', 'humans.txt', 'robots.txt'],
	modernizr: [src + 'modernizr.js']
};
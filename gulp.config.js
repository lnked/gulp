const app = './dist/';
const src = './frontend/';
const asp = src + 'assets/';

exports.app  = app;
exports.src  = src;
exports.path = {
	build: {
		html:			app,
		vendors:		app + 'js',
		scripts:		app + 'js',
		styles:			app + 'css',
		images:			app + 'images',
		favicon:		app + 'favicon',
		fonts:			app + 'fonts',
		json:			app + 'json'
	},
	assets: {
		images:         [asp + 'images/**/*'],
		favicon:        [asp + 'favicon/**/*.*'],
		fonts:          [asp + 'fonts/**/*.*'],
		json:           [asp + 'json/**/*.json'],

		html:           [src + 'template/*.html'],
		vendors:        [src + 'scripts/vendor/**/*.js'],
		scripts:        [src + 'scripts/app/**/*.js'],
		styles:         [src + 'styles/*.scss']
	},
	watch: {
		images:         [asp + 'images/**/*.*'],
		favicon:        [asp + 'favicon/**/*.*'],
		fonts:          [asp + 'fonts/**/*.*'],
		json:           [asp + 'json/**/*.json'],

		html:           [src + 'template/*.html', src + 'template/**/*.html'],
		'scripts:app':	[src + 'scripts/app/**/*.js'],
		styles:         [src + 'styles/**/*.scss']
	},
	extras: [
		asp + 'humans.txt',
		asp + 'robots.txt'
	],
	modernizr: [src + 'modernizr.js']
};
const src = './frontend/';
const app = './public_html/';

module.exports.app  = app;
module.exports.src  = src;
module.exports.path = {
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
		images:			[src + 'assets/images/**/*'],
		favicon:		[src + 'assets/favicon/**/*.*'],
		fonts:			[src + 'assets/fonts/**/*.*'],
		json:			[src + 'assets/json/**/*.json'],

		html:			[src + 'template/*.html'],
		vendors:		[src + 'scripts/vendor/**/*.js'],
		scripts:		[src + 'scripts/app/**/*.js'],
		styles:			[src + 'styles/*.scss']
	},
	watch: {
		images:			[src + 'assets/images/**/*.*'],
		favicon: 		[src + 'assets/favicon/**/*.*'],
		fonts:			[src + 'assets/fonts/**/*.*'],
		json:			[src + 'assets/json/**/*.json'],
		html:			[src + 'template/*.html', src + 'template/**/*.html'],
		'scripts:app': 	[src + 'scripts/app/**/*.js'],
		styles:			[src + 'styles/**/*.scss']
	},
	extras: [
		src + 'assets/humans.txt',
		src + 'assets/robots.txt'
	],
	modernizr: [src + 'modernizr.js']
};

module.exports.server = {
	proxy: "clean.dev",
	server: {
		baseDir: app
	}
};
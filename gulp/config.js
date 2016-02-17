const app = './public_html/';
const src = './frontend/';
const asp = src + 'assets/';

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

'use strict';

const $             = require('gulp-load-plugins')();
const gulp          = require('gulp');

module.exports = function(options) {
	
	return function(callback) {

		$.webpack({
			bail: false,
			debug: true,
			entry: options.file,
			output: {
				filename: "gui.js",
				path: './' + options.path + 'js'
			},
			devtool: "#inline-source-map",
			plugins: [
				new $.webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false
					},
					output: {
						comments: false,
						semicolons: true
					},
					sourceMap: true
				})
			],
			module: {
				loaders: [ {
					test: /\.css$/,
					loader: ["style", "css"]
				}]
			}

		}, function (err, stats) {
			if (stats.compilation.errors.length > 0) {
				console.log(stats.compilation.errors[0].message);
			}
		});

		callback();
	};
	
};
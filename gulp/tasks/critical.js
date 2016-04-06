'use strict';

const gulp			= require('gulp');
const critical 		= require('critical'); // .stream;

module.exports = function(options) {
	return function(callback) {

		setTimeout(function(){
			critical.generate(options.critical);
		}, 1500);
		
		callback();
	};
};
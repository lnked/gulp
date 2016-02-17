'use strict';

const browserSync = require('browser-sync').create();

module.exports = function(options) {

  return function() {

    browserSync.init({
      server: options.src
    });

    browserSync.watch(`${options.src}/**/*.*`).on('change', browserSync.reload);
  };

};


gulp.task('webserver', function(){
	browserSync.init(config.server);
	browserSync.watch(app + '**/*.*').on('change', browserSync.reload);
});
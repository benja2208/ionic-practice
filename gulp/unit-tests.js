'use strict';

var path = require('path');
var gulp = require('gulp');
var karma = require('karma');

// Karma Test
gulp.task('test', function () {
  return
  gulp.src(config.src.js)
      .pipe(karma({
        configFile: './karma.conf.js',
        action    : run
      }))
      .on('error', function (err) {
        throw err;
      });
});
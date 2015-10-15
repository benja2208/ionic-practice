'use strict';
var path    = require('path');
var gulp    = require('gulp');
var paths   = require('./config');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

// Lint
gulp.task('jshint', function () {
    return gulp.src(paths.src.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
'use strict';

var path    = require('path');
var gulp    = require('gulp');
var paths   = require('./config');
var console = require('console');

// Watch
gulp.task('watch', function () {
    gulp.watch(paths.src.sass, ['sass']);
    gulp.watch(paths.libs, ['inject']);
    gulp.watch(paths.src.js, [
        'inject',
        'translate'
    ]);
});
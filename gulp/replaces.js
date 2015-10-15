'use strict';
var path  = require('path');
var gulp  = require('gulp');
var replace       = require('replace');
var paths = require('./config');

// Replaces
gulp.task('replace:prod', function () {
    return replace({
        regex      : paths.const.api.dev,
        replacement: paths.const.api.prod,
        paths      : config,
        recursive  : false,
        silent     : false
    });
});

gulp.task('replace:dev', function () {
    return replace({
        regex      : paths.const.api.prod,
        replacement: paths.const.api.dev,
        paths      : config,
        recursive  : false,
        silent     : false
    });
});
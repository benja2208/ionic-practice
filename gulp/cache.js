'use strict';
var path         = require('path');
var gulp         = require('gulp');
var replace       = require('replace');
var paths        = require('./config');
var replaceFiles = ['./www/js/app.js'];

// Cache Modules
// ADD
gulp.task('cacheapp:add', function () {
    return replace({
        regex      : "//'cacheapp'",
        replacement: "'cacheapp'",
        paths      : replaceFiles,
        recursive  : false,
        silent     : false
    });
});

gulp.task('cachemodule:add', function () {
    return replace({
        regex      : "//'cachemodule'",
        replacement: "'cachemodule'",
        paths      : replaceFiles,
        recursive  : false,
        silent     : false
    });
});

// REMOVE
gulp.task('cacheapp:remove', function () {
    return replace({
        regex      : "'cacheapp'",
        replacement: "//'cacheapp'",
        paths      : replaceFiles,
        recursive  : false,
        silent     : false
    });
});
gulp.task('cachemodule:remove', function () {
    return replace({
        regex      : "'cachemodule'",
        replacement: "//'cachemodule'",
        paths      : replaceFiles,
        recursive  : false,
        silent     : false
    });
});
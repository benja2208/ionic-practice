/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp        = require('gulp');
var wrench      = require('wrench');
var runSequence = require('run-sequence');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file);
});


// Master Tasks
gulp.task('default', [
    'sass',
    'translate',
    'inject'
]);

gulp.task('dev', function (cb) {
    return runSequence(
        'install',
        'sass',
        'translate',
        'copy:font',
        'inject',
        //'prettify',
        cb);
});

gulp.task('prod', function (cb) {
    return runSequence(
        'templates',
        'dev',
        'clean',
        'copy',
        'cacheapp:add',
        'cachemodule:add',
        'usemin',
        'cacheapp:remove',
        'cachemodule:remove',
        cb
    );
});
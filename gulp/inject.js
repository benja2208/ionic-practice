'use strict';
var path       = require('path');
var gulp       = require('gulp');
var bowerFiles = require('main-bower-files');
var inject     = require('gulp-inject');
var paths      = require('./config');

// Inject Files
gulp.task('inject', function () {
    return gulp.src(paths.src.index)
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
            name: 'bower',
            relative: true
        }))
        .pipe(inject(gulp.src(paths.src.js, {read: false}), {relative: true}))
        .pipe(inject(gulp.src(paths.src.css, {read: false}), {relative: true}))
        .pipe(gulp.dest(paths.source));
});
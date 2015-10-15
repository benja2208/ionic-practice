'use strict';
var path          = require('path');
var gulp          = require('gulp');
var minifyHTML    = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');
var iife          = require("gulp-iife");
var paths         = require('./config');

// Templates
gulp.task('template:app', function () {
    gulp.src(['./www/app/**/*.html'])
        .pipe(minifyHTML({quotes: true}))
        .pipe(templateCache({
            module    : 'cacheapp',
            filename: 'cacheapp.js',
            root    : 'app',
            standalone: true
        }))
        .pipe(iife())
        .pipe(gulp.dest('./www/js/'));
});

gulp.task('template:module', function () {
    gulp.src(['./www/module/**/*.html'])
        .pipe(minifyHTML({quotes: true}))
        .pipe(templateCache({
            module    : 'cachemodule',
            filename: 'cachemodule.js',
            root    : 'module',
            standalone: true
        }))
        .pipe(iife())
        .pipe(gulp.dest('./www/js/'));
});

gulp.task('templates', [
    'template:app',
    'template:module'
]);
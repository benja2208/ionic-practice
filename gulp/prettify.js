'use strict';
var path     = require('path');
var gulp     = require('gulp');
var prettify = require('gulp-jsbeautifier');
var paths    = require('./config');

// Prettify Code
gulp.task('prettify', [
    'prettify:js:js',
    'prettify:js:app',
    'prettify:js:component',
    'prettify:js:module',
    'prettify:html:app',
    'prettify:html:module',
]);
gulp.task('prettify:js:js', function () {
    gulp.src('www/js/*.js')
        .pipe(prettify({config: ".jsbeautifyrc"}))
        .pipe(gulp.dest('www/js'));
});

gulp.task('prettify:js:app', function () {
    gulp.src([
            'www/app/*.js',
            'www/app/**/*.js'
        ])
        .pipe(prettify({config: ".jsbeautifyrc"}))
        .pipe(gulp.dest('www/app'));
});

gulp.task('prettify:js:component', function () {
    gulp.src([
            'www/component/*.js',
            'www/component/**/*.js'
        ])
        .pipe(prettify({config: ".jsbeautifyrc"}))
        .pipe(gulp.dest('www/component'));
});

gulp.task('prettify:js:module', function () {
    gulp.src([
            'www/module/*.js',
            'www/module/**/*.js'
        ])
        .pipe(prettify({config: ".jsbeautifyrc"}))
        .pipe(gulp.dest('www/module'));
});

// HTML
gulp.task('prettify:html:app', function () {
    gulp.src('www/app/*/view/*.html')
        .pipe(prettify({
            braceStyle         : "collapse",
            indentChar: " ",
            indentScripts: "keep",
            indentSize   : 4,
            maxPreserveNewlines: 10,
            preserveNewlines   : true,
            wrapLineLength     : 0
        }))
        .pipe(gulp.dest('www/app'));
});

gulp.task('prettify:html:module', function () {
    gulp.src('www/module/*/view/*.html')
        .pipe(prettify({
            braceStyle         : "collapse",
            indentChar: " ",
            indentScripts: "keep",
            indentSize   : 4,
            maxPreserveNewlines: 10,
            preserveNewlines   : true,
            wrapLineLength     : 0
        }))
        .pipe(gulp.dest('www/module'));
});

'use strict';
var path       = require('path');
var gulp       = require('gulp');
var fs         = require('fs');
var minifyHTML = require('gulp-minify-html');
var minifyCSS  = require('gulp-minify-css');
var uglify     = require('gulp-uglify');
var rev        = require('gulp-rev');
var stripDebug = require('gulp-strip-debug');
var ngAnnotate = require('gulp-ng-annotate');
var jshint     = require('gulp-jshint');
var header     = require('gulp-header');
var usemin     = require('gulp-usemin');
var paths      = require('./config');

// Minify
// Get copyright using NodeJs file system
var getCopyright = function () {
    return fs.readFileSync('./LICENSE.md');
};


gulp.task('usemin', function () {
    return gulp
        .src(paths.source + '/index.html')
        .pipe(usemin({
            css: [
                minifyCSS()
            ],
            cssvendor: [
                minifyCSS()
            ],
            html: [
                minifyHTML({
                    empty: true
                })
            ],
            jsvendor: [
                // jshint.reporter ('default'),
                uglify(),
                rev()
            ],
            js: [
                stripDebug(),
                //iife (),
                jshint.reporter('default'),
                ngAnnotate({
                    add: true
                }),
                uglify(),
                header(getCopyright(), {
                    version: paths.version
                }),
                rev()
            ]
        }))
        .pipe(gulp.dest(paths.dist));
});
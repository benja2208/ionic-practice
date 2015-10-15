'use strict';
var path  = require('path');
var gulp  = require('gulp');
var paths = require('./config');

// Copy
gulp.task('copy', function () {
    // Images
    gulp
        .src(paths.source + '/img/**')
        .pipe(gulp.dest(paths.dist + '/img'));

    // Deploy
    gulp
        .src(paths.source + '/fonts/**')
        .pipe(gulp.dest(paths.dist + '/fonts'));

});

// Copy Fonts
gulp.task('copy:font', function () {

    // Ionic
    gulp
        .src(paths.source + '/lib/ionic/fonts/**')
        .pipe(gulp.dest(paths.source + '/fonts'));

    // Ionic Icons
    gulp
        .src(paths.source + '/lib/simple-line-icons/fonts/**')
        .pipe(gulp.dest(paths.source + '/fonts'));


});
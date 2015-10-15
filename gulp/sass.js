'use strict';
var path  = require('path');
var gulp  = require('gulp');
var sass  = require('gulp-sass');
var paths = require('./config');

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});
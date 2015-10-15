'use strict';
var path     = require('path');
var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var paths    = require('./config');

// Image Mim
gulp.task('img', function () {
    return gulp.src('./www/img/**/*')
        //.pipe(imageResize({width: 1080}))
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive      : true,
            interlace        : true
        }))
        .pipe(gulp.dest(paths.dist + '/img'));
});

gulp.task('img_x2', function () {
    return gulp.src('./www/img_x2/**/*')
        //.pipe(imageResize({width: 1080}))
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive      : true,
            interlace        : true
        }))
        .pipe(gulp.dest(paths.dist + '/img_x2'));
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function () {
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist + 'img'));
});
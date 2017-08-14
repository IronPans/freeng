'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglifycss = require('gulp-uglifycss'),
  rename = require('gulp-rename'),
  del = require('del'),
  flatten = require('gulp-flatten');

gulp.task('build-css', function() {
  gulp.src([
    'src/app/component/common/common.css',
    'src/app/component/**/*.css'
  ])
    .pipe(concat('freeng.css'))
    .pipe(gulp.dest('resources'));
});

gulp.task('build-css-prod', function() {
  gulp.src([
    'src/app/component/common/common.css',
    'src/app/component/**/*.css'
  ])
    .pipe(concat('freeng.css'))
    .pipe(gulp.dest('resources'))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename('freeng.min.css'))
    .pipe(gulp.dest('resources'));
});

gulp.task('build-themes', function() {
  return gulp.src(['src/assets/themes/*'])
    .pipe(gulp.dest('resources/themes'));
});

gulp.task('build-images', function() {
  gulp.src(['src/app/component/**/images/*.png', 'src/app/component/**/images/*.svg'])
    .pipe(flatten())
    .pipe(gulp.dest('resources/images'));
});

gulp.task('clean', function() {
  del(['resources']);
});

gulp.task('build-release', ['clean','build-css-prod', 'build-images', 'build-themes']);

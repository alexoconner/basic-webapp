/**
 *
 * Basic Webapp Gulpfile
 * run "gulp" or "gulp build" for building into dist
 *
 */


var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var del = require('del');
var copy = require('gulp-copy');

var src = 'src/';
var dist = 'dist/';

gulp.task('clean', function(cb) {
    del(dist, cb);
});

gulp.task('less', function() {
    return gulp.src(src + 'styles/styles.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist));
});

gulp.task('html', function() {
    return gulp.src([src + '*.html', src + 'pages/**/*.html'])
        .pipe(usemin())
        .pipe(gulp.dest(dist));
});

gulp.task('assets', function() {
    return gulp.src(src + 'assets/**/*')
        .pipe(gulp.dest(dist + 'assets/'));
});

gulp.task('watch', ['build'], function() {
    watch(src + 'styles/**/*.less', function() {
        gulp.start('less');
    });
    watch([src + '*.html', src + 'pages/**/*.html'], function() {
        gulp.start('html');
    });
});

gulp.task('build', ['clean'], function() {
    return gulp.start([
        'less',
        'html',
        'assets'
    ]);
});
/**
 *
 * Basic Webapp Gulpfile
 * run "gulp" or "gulp build" for building into dist
 * @Tasks: [gulp, gulp watch, gulp build]
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
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var http = require('http');
var st = require('st');

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
        .pipe(gulp.dest(dist))
        .pipe(livereload());
});

gulp.task('scripts', function() {
    return gulp.src(src + 'scripts/**/*')
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(dist))
        .pipe(livereload());
});

gulp.task('html', function() {
    return gulp.src([src + '*.html', src + 'pages/**/*.html'])
        .pipe(usemin())
        .pipe(gulp.dest(dist))
        .pipe(livereload());
});

gulp.task('assets', function() {
    return gulp.src(src + 'assets/**/*')
        .pipe(gulp.dest(dist + 'assets/'));
});

gulp.task('watch', ['build', 'server'], function() {
    livereload.listen({ basePath: 'dist' });
    watch(src + 'styles/**/*.less', function() {
        gulp.start('less');
    });
    watch(src + 'scripts/**/*.js', function() {
        gulp.start('scripts');
    });
    watch([src + '*.html', src + 'pages/**/*.html'], function() {
        gulp.start('html');
    });
});

gulp.task('server', function(done) {
    http.createServer(
        st({ path: __dirname + '/dist', index: 'index.html', cache: false })
    ).listen(8080, done);
});

gulp.task('build', ['clean'], function() {
    return gulp.start([
        'less',
        'scripts',
        'html',
        'assets'
    ]);
});

// run build that does everything on default
gulp.task('default', ['build']);
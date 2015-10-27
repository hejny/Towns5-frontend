var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    jsdoc = require("gulp-jsdoc"),
    rename = require('gulp-rename'),
    del = require('del');

// HTML
gulp.task('production-html', function () {
    gulp.src('app/*.html')
        .pipe(minifyHTML({
            conditionals: true,
            spare: true
        }))
        .pipe(gulp.dest('public/'));
});

// Scripts
gulp.task('production-scripts', function() {
    gulp.src('app/js/*.js')
        .pipe(concat('towns.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));

    gulp.src("app/js/*.js")
        .pipe(jsdoc('documentation/'));
});

gulp.task('development-scripts', function() {
});

// Styly
gulp.task('production-styles', function () {
    gulp.src('app/**/*.css')
        .pipe(concat('towns.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
});

gulp.task('development-styles', function () {
});

// Obrazky
gulp.task('production-images', function () {
    gulp.src('media/image/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true, multipass: true })))
        //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true, multipass: true }))
        .pipe(gulp.dest('public/media/image'));
});

// Zvuky
gulp.task('production-sound', function () {
    gulp.src('media/sound/*')
        .pipe(gulp.dest('public/media/sound'));
});

// Lint
gulp.task("lint", function() {
    gulp.src("app/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

// Vymazanie pred buildom
gulp.task('production-clean', function() {
    del(['public/index.html', 'public/css', 'public/js', 'public/media/image', 'public/media/sound'])

    //todo [SK] opravit index.html na index.php (ten by se podle me nemel minifikovat) viz trello
});

// Starter development Buildu
gulp.task('default', ['development-styles', 'development-scripts'], function() {
    gulp.start('watch');
    console.log(' ¯\\_(ツ)_/¯ Development build je hotovy, teraz uz len kontrolujem zmeny ');
});

// Starter Produkcneho Buildu
gulp.task('public', ['production-clean'], function() {
    gulp.start('build');
});

// Build
gulp.task('build', ['production-html', 'production-scripts', 'production-styles', 'production-images', 'production-sound'], function () {
    console.log(' ¯\\_(ツ)_/¯ Produkcny build je hotovy ');
});

// Sledovanie zmien
gulp.task('watch', function() {

    // Sleduj html zmeny
    gulp.watch('app/*.{htm,html}', ['html']);

    // Sleduj css zmeny
    gulp.watch('app/**/*.css', ['styles']);

    // Sleduj js zmeny
    gulp.watch('app/**/*.js', ['scripts']);

    // Sleduj zmeny obrazkov
    gulp.watch('media/image/**/*', ['images']);

    // Sleduj zmeny zvukov
    gulp.watch('media/sound/*', ['sound']);

});
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    jsdoc = require("gulp-jsdoc"),
    rename = require('gulp-rename'),
    del = require('del'),
    config = require('./config/app.json');

// Index.php pre produkcny build
gulp.task('production-index', function () {
    gulp.src('app/*.php')
        .pipe(gulp.dest('app-dist/'));
});

// Scripts
gulp.task('production-scripts', function() {
    gulp.src('app/js/*.js')
        .pipe(concat('towns.js'))
        .pipe(gulp.dest('app-dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app-dist/js'));
});

// Styly
gulp.task('production-styles', function () {
    gulp.src('app/**/*.css')
        .pipe(concat('towns.css'))
        .pipe(gulp.dest('app-dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('app-dist/css'));
});

// Obrazky - nateraz neaktivne
gulp.task('production-images', function () {
    gulp.src('media/image/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true, multipass: true })))
        //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true, multipass: true }))
        .pipe(gulp.dest('app-dist/media/image'));
});

// Zvuky - nateraz neaktivne
gulp.task('production-sound', function () {
    gulp.src('media/sound/*')
        .pipe(gulp.dest('app-dist/media/sound'));
});

// Lint - testovanie
gulp.task("test", function() {
    gulp.src("app/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

// Dokumentácia
gulp.task("documentation", function() {
    gulp.src("app/js/*.js")
        .pipe(jsdoc('documentation/'));
});

// Starter Buildu
gulp.task('default', function() {
    // Nacita sa hodnota environment z konfiguracneho suboru a spusti sa spravny build
    if(config.environment == "develop") {
        gulp.start("develop");
    } else {
        if (config.environment == "test") {
            gulp.start("test")
        } else {
            gulp.start("production")
        }
    }

});

// Vycisti develop a zacni Develop Build
gulp.task('develop', ['develop-clean'], function() {
    gulp.start('develop-build');
});

// Vymazanie develop kniznic pred buildom
gulp.task('develop-clean', function() {
    del([
        'app/css-lib/*',
        'app/js-lib/*',
        'app/fonts/*'
    ])
});

// Index.php pre development build
gulp.task('develop-index', function () {
    // ziadna uloha momentalne
});

// Priprav scripty pre develop build
gulp.task('develop-scripts', function() {
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery-ui-bundle/jquery-ui.js',
        'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
        'node_modules/jquery-mousewheel/jquery.mousewheel.js',
        'node_modules/hammerjs/hammer.js',
        'node_modules/jquery-fullscreen/jquery-fullscreen.js'])
        .pipe(gulp.dest('app/js-lib/'));
});

// Priprav style pre develop build
gulp.task('develop-styles', function () {
    gulp.src([
        'node_modules/roboto-fontface/css/roboto-fontface.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'node_modules/font-awesome-animation/src/font-awesome-animation.css'])
        .pipe(gulp.dest('app/css-lib/'));
});

// Priprav fonty pre develop build
gulp.task('develop-fonts', function () {
    gulp.src([
        'node_modules/roboto-fontface/fonts/*',
        'node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('app/fonts/'));
});

// Develop Build
gulp.task('develop-build', [
    'develop-index',
    'develop-scripts',
    //'develop-images',
    //'develop-sound',
    'develop-styles',
    'develop-fonts'
], function () {
    gulp.start('develop-watch');
    console.log(' ¯\\_(ツ)_/¯ Development build je teraz hotový, už len kontrolujem zmeny ');
});

// Sledovanie zmien
gulp.task('develop-watch', function() {

    // Sleduj index zmeny
    gulp.watch('app/*.{php,phtml}', ['develop-index']);

    // Sleduj css zmeny
    gulp.watch('app/**/*.css', ['develop-styles']);

    // Sleduj js zmeny
    gulp.watch('app/**/*.js', ['develop-scripts']);

    // Sleduj zmeny obrazkov
    //gulp.watch('media/image/**/*', ['develop-images']);

    // Sleduj zmeny zvukov
    //gulp.watch('media/sound/*', ['develop-sound']);

});

// Vycisti production adresar a zacni Produkcny Build
gulp.task('production', ['production-clean'], function() {
    gulp.start('production-build');
});

// Vymazanie production suborov pred buildom
gulp.task('production-clean', function() {
    del([
        'app-dist/index.php',
        'app-dist/css',
        //'app-dist/media/image',
        //'app-dist/media/sound',
        'app-dist/js'

    ])
});

// Produkcny Build
gulp.task('production-build', [
    'production-index',
    'production-scripts',
    //'production-images',
    //'production-sound',
    'production-styles'
], function () {
    console.log(' ¯\\_(ツ)_/¯ Produkčný build je hotový ');
});
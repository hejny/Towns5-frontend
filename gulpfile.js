var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
//jsdoc = require("gulp-jsdoc"),
    rename = require('gulp-rename'),
    del = require('del'),
    config = require('./config/app.json');

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
        'node_modules/jquery-fullscreen-plugin/jquery.fullscreen.js'
    ])
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
        'app-dist/css/*',
        //'app-dist/media/image',
        //'app-dist/media/sound',
        'app-dist/js/*',
        'app-dist/fonts/*'
    ])
});

// Produkcny Build
gulp.task('production-build', [
    'production-index',
    'production-scripts',
    //'production-images',
    //'production-sound',
    'production-styles',
    'production-fonts',
    'production-graphic'
], function () {
    console.log(' ¯\\_(ツ)_/¯ Produkčný build je hotový ');
});

// Index.php pre produkcny build
gulp.task('production-index', function () {
    gulp.src('app/*.php')
        .pipe(gulp.dest('app-dist/'));
});

// Scripts - musia byt vylistovane radsej ako nacitanim s wildcard pretoze poradie nacitania zalezi
gulp.task('production-scripts', function() {
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery-ui-bundle/jquery-ui.js',
        //'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
        'node_modules/jquery-mousewheel/jquery.mousewheel.js',
        'node_modules/hammerjs/hammer.js',
        'node_modules/jquery-fullscreen-plugin/jquery.fullscreen.js',
        'app/js/func.lib.js',
        'app/js/main.js',
        'app/js/lang.lib.js',
        'app/locale/cs.js',
        'app/js/townsapi.lib.js',
        'app/js/townsapi.fake.lib.js',
        'app/js/functions/create.js',
        'app/js/functions/terrain.js',
        'app/js/map.lib.js',
        'app/js/model.lib.js',
        'app/js/graphic.js',
        'app/js/events.js',
        'app/js/objectmenu.js',
        'app/js/terrainmenu.js',
        'app/js/uniquemenu.js',
        'app/js/ui.js',
        //'app/js/localstorage.fake.js.php',
        'app/coffeehtml/debug.js',
        //'app/coffeehtml/loginform.js',
        'app/coffeehtml/projects.js',
        'app/js/functions/login.js'
        //'browser-sync/browser-sync-client.2.9.8.js'
    ])
        .pipe(concat('towns.js'))
        .pipe(gulp.dest('app-dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app-dist/js'));
});

// Styly - musia byt vylistovane radsej ako nacitanim s wildcard pretoze poradie nacitania zalezi
gulp.task('production-styles', function () {
    gulp.src([
        'app/css/*.css',
        'node_modules/roboto-fontface/css/roboto-fontface.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'node_modules/font-awesome-animation/src/font-awesome-animation.css'])
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

// Priprav fonty pre produkčný build
gulp.task('production-fonts', function () {
    gulp.src([
        'node_modules/roboto-fontface/fonts/*',
        'node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('app-dist/fonts/'));
});

// Priprav graphic pre produkčný build
gulp.task('production-graphic', function () {
    gulp.src([
        'app/graphic/*'])
        .pipe(gulp.dest('app-dist/graphic/'));
});
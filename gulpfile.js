



var gulp = require('gulp'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    //jsdoc = require("gulp-jsdoc"),
    rename = require('gulp-rename'),
    del = require('del'),
    es6transpiler = require('gulp-es6-transpiler'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass');



// Configuration autoloader
var config = [];
fs.readdirSync("./config").forEach(function(file) {
    if (file.match(/\.json$/) !== null) {
        var name = file.replace('.json', '');
        config[name] = require('./config/' + file);
    }
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
    if(config.app.environment == "develop") {
        gulp.start("develop");
    } else {
        if (config.app.environment == "test") {
            gulp.start("test")
        } else {
            gulp.start("production")
        }
    }

});


//======================================================================================================================

gulp.task('develop', function() {
    browserSync.init({
        proxy: "towns.local"
    });


    gulp.src("app/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"));


    gulp.watch("app/scss/**/*.scss", ['develop-sass']);
    gulp.watch('app/**/*.{js,php,phtml}').on('change', browserSync.reload);

});


// Compile sass into CSS & auto-inject into browsers
gulp.task('develop-sass', function() {

    try {

        del(['app/css/*']);

        return gulp.src("app/scss/**/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("app/css"))
            .pipe(browserSync.stream());

    }catch(e){

        console.log(e);
    }

});


//======================================================================================================================


// Vycisti production adresar a zacni Produkcny Build
gulp.task('production', ['production-clean'], function() {
    gulp.start('production-build');
});

// Vymazanie production suborov pred buildom
gulp.task('production-clean', function() {
    del([
        'app-dist/index.php',
        'app-dist/scss/*',
        //'app-dist/media/image',
        //'app-dist/media/sound',
        'app-dist/js/*',
        'app-dist/fonts/*'
    ])
});

// Produkcny Build
gulp.task('production-build', [
    'production-index',
    'production-locale',
    'production-scripts',
    'production-images',
    //'production-sound',
    'production-styles',
    'production-fonts',
    'production-php'
], function () {
    console.log(' ¯\\_(ツ)_/¯ Produkčný build je hotový ');
});



// Index.php pre produkcny build
gulp.task('production-index', function () {
    gulp.src('app/*.php')
        .pipe(gulp.dest('app-dist/'));

    gulp.src('app/php/neon/*.php')//todo better solution for php subdirs
        .pipe(gulp.dest('app-dist/php/neon/'));

    gulp.src('app/php/neon/Neon/*.php')
        .pipe(gulp.dest('app-dist/php/neon/Neon/'));


});


// Index.php pre produkcny build
gulp.task('production-locale', function () {
    gulp.src('app/locale/*.neon')
        .pipe(gulp.dest('app-dist/locale/'));


});


var _tmp=[];
for(i=0,l=config.includes.js.length;i<l;i++){

    if(typeof config.includes.js[i] != 'string'){

        for(var key in config.includes.js[i]){
            if(key==/*config.app.environment*/'production'){

                _tmp.push(config.includes.js[i][key]);

            }
        }

    }else{
        _tmp.push(config.includes.js[i]);
    }


}
config.includes.js =_tmp;
delete _tmp;

//console.log(config.includes['js']);


// Scripts
gulp.task('production-scripts', function() {
    gulp.src(config.includes.js)
        .pipe(concat('towns.js'))
        //.pipe(gulp.dest('app-dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(es6transpiler({
            "disallowUnknownReferences": false,
            "disallowDuplicated": false
        }))
        //.pipe(uglify())
        .pipe(gulp.dest('app-dist/js'));
});

// Styly
gulp.task('production-styles', function () {
    gulp.src(config.includes.css)
        .pipe(sass())
        .pipe(concat('towns.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss({compatibility: 'ie8',keepSpecialComments : false}))
        .pipe(gulp.dest('app-dist/css'));
});

// Obrazky - nateraz neaktivne //todo use in app
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

// Priprav php pre produkčný build
gulp.task('production-php', function () {
    gulp.src([
        'app/php/*'])
        .pipe(gulp.dest('app-dist/php/'));
});
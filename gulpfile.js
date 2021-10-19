var gulp = require('gulp');
var fs = require('fs');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var jsdoc = require('gulp-jsdoc3');
var rename = require('gulp-rename');
var del = require('del');
var es6transpiler = require('gulp-es6-transpiler');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Configuration autoloader
var config = [];
fs.readdirSync("./config").forEach(function(file) {
  if (file.match(/\.json$/) !== null) {
    var name = file.replace('.json', '');
    config[name] = require('./config/' + file);
  }
});

//------------------------------------

var _tmp = [];
for (i = 0, l = config.includes.js.length; i < l; i++) {

  if (typeof config.includes.js[i] != 'string') {

    for (var key in config.includes.js[i]) {
      if (key == /*config.app.environment*/ 'production') {

        _tmp.push(config.includes.js[i][key]);
      }
    }

  } else {
    _tmp.push(config.includes.js[i]);
  }
}
config.includes.js = _tmp;
config.includes.js_no_modules = config.includes.js.filter(function(
    file) { return (file.search('node_modules') == -1); });

//======================================================================================================================Test

// Lint - testovanie
gulp.task("test", function() {
  gulp.src(config.includes.js_no_modules)
      .pipe(jshint({esversion : 6, laxcomma : true}))
      .pipe(jshint.reporter("default"));
});

//======================================================================================================================Documentation

deleteFolderRecursive = function(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

//-------------------

gulp.task('documentation', function(callback) {
  var documentation_config = {
    "tags" : {"allowUnknownTags" : true},
    "source" : {"excludePattern" : "(^|\\/|\\\\)_"},
    "opts" : {"destination" : "./documentation"},
    "plugins" : [ "plugins/markdown" ],
    "templates" : {
      "cleverLinks" : false,
      "monospaceLinks" : false,
      "default" : {"outputSourceFiles" : true},
      "path" : "ink-docstrap",
      "theme" : "cerulean",
      "navType" : "vertical",
      "linenums" : true,
      "dateFormat" : "MMMM Do YYYY, h:mm:ss a"
    }
  };

  deleteFolderRecursive('./documentation');

  gulp.src(config.includes.js_no_modules /*, {read: false}*/)
      .pipe(jsdoc(documentation_config, callback));
});

//======================================================================================================================Default

// Starter Buildu
gulp.task('default', function() {
  // Nacita sa hodnota environment z konfiguracneho suboru a spusti sa spravny
  // build
  if (config.app.environment == "develop") {
    gulp.start("develop");
  } else {
    if (config.app.environment == "test") {
      gulp.start("test")
    } else {
      gulp.start("production")
    }
  }
});

//======================================================================================================================Develop

gulp.task('develop', function() {
  browserSync.init({proxy : "towns.local"});

  gulp.src("app/scss/**/*.scss").pipe(sass()).pipe(gulp.dest("app/css"));

  gulp.watch("app/scss/**/*.scss", [ 'develop-sass' ]);
  // gulp.watch('app/**/*.{js,php,phtml}').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('develop-sass', function() {
  try {

    del([ 'app/css/*' ]);

    return gulp.src("app/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());

  } catch (e) {

    console.log(e);
  }
});

//======================================================================================================================Build

gulp.task('build', [ 'production' ]); // alias

// Vycisti production adresar a zacni Produkcny Build
gulp.task('production', [ 'production-clean' ],
          function() { gulp.start('production-build'); });

// Vymazanie production suborov pred buildom
gulp.task('production-clean', function() {
  del([
    'app-build/index.php', 'app-build/scss/*',
    //'app-build/media/image',
    //'app-build/media/sound',
    'app-build/js/*', 'app-build/fonts/*'
  ])
});

// Produkcny Build
gulp.task(
    'production-build',
    [
      'production-index', 'production-locale', 'production-scripts',
      'production-images',
      //'production-sound',
      'production-styles', 'production-fonts', 'production-php'
    ],
    function() { console.log(' ¯\\_(ツ)_/¯ Produkčný build je hotový '); });

// Index.php pre produkcny build
gulp.task('production-index', function() {
  gulp.src('app/**/*.php').pipe(gulp.dest('app-build/'));
});

// Index.php pre produkcny build
gulp.task('production-locale', function() {
  gulp.src('app/locale/*.neon').pipe(gulp.dest('app-build/locale/'));
});

// Scripts
gulp.task('production-scripts', function() {
  gulp.src(config.includes.js)
      .pipe(concat('towns.js'))
      //.pipe(gulp.dest('app-build'))
      .pipe(rename({suffix : '.min'}))
      .pipe(es6transpiler(
          {"disallowUnknownReferences" : false, "disallowDuplicated" : false}))
      //.pipe(uglify())
      .pipe(gulp.dest('app-build/js'));
});

// Styly
gulp.task('production-styles', function() {
  gulp.src(config.includes.css)
      .pipe(sass())
      .pipe(concat('towns.css'))
      .pipe(rename({suffix : '.min'}))
      .pipe(minifyCss({compatibility : 'ie8', keepSpecialComments : false}))
      .pipe(gulp.dest('app-build/css'));
});

// Obrazky - nateraz neaktivne //todo use in app
gulp.task('production-images', function() {
  gulp.src('media/image/**/*')
      .pipe(cache(imagemin({
        optimizationLevel : 5,
        progressive : true,
        interlaced : true,
        multipass : true
      })))
      //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced:
      //true, multipass: true }))
      .pipe(gulp.dest('app-build/media/image'));
});

// Zvuky - nateraz neaktivne
gulp.task('production-sound', function() {
  gulp.src('media/sound/*').pipe(gulp.dest('app-build/media/sound'));
});

// Priprav fonty pre produkčný build
gulp.task('production-fonts', function() {
  gulp.src([
        'node_modules/roboto-fontface/fonts/*',
        'node_modules/font-awesome/fonts/*'
      ])
      .pipe(gulp.dest('app-build/fonts/'));
});

// Priprav php pre produkčný build
gulp.task('production-php', function() {
  gulp.src([ 'app/php/*' ]).pipe(gulp.dest('app-build/php/'));
});
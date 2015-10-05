

var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var concat = require('gulp-concat');

var jsdoc = require("gulp-jsdoc");

gulp.task('build', function() {







    gulp.src('app/*.html')
        .pipe(minifyHTML({
            conditionals: true,
            spare:true
        }))
        .pipe(gulp.dest('app-dist/'));


    gulp.src('app/*/*.js')
        .pipe(uglify())
        .pipe(concat('towns.js'))
        .pipe(gulp.dest('app-dist/'));


    gulp.src('app/*/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('towns.css'))
        .pipe(gulp.dest('app-dist/'));




    gulp.src("app/js/*.js")
        .pipe(jsdoc('documentation/'));



    return;














});



/*var jsdoc = require("gulp-jsdoc");

 gulp.src("./src/*.js")
 .pipe(jsdoc('./documentation-output'))*/
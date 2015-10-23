var gulp        = require('gulp');
var minifyHTML  = require('gulp-minify-html');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var concat      = require('gulp-concat');
var jsdoc       = require("gulp-jsdoc");


gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(minifyHTML({
            conditionals: true,
            spare:true
        }))
        .pipe(gulp.dest('app-dist/'));
});

gulp.task('scripts', function () {
    gulp.src('app/*/*.js')
        .pipe(uglify())
        .pipe(concat('towns.js'))
        .pipe(gulp.dest('app-dist/'));

    gulp.src("app/js/*.js")
        .pipe(jsdoc('documentation/'));

    /*var jsdoc = require("gulp-jsdoc");

     gulp.src("./src/*.js")
     .pipe(jsdoc('./documentation-output'))*/
});

gulp.task('css', function () {
    gulp.src('app/*/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('towns.css'))
        .pipe(gulp.dest('app-dist/'));
});

gulp.task('default', ['html', 'scripts', 'css'], function() {

    console.log(' ¯\\_(ツ)_/¯ Hotovo, teraz uz len checkujem zmeny ');
    gulp.watch('app/*.{htm,html}', ['html']);
    gulp.watch('app/*/*.js', ['scripts']);
    gulp.watch('app/*/*.css', ['css']);

});
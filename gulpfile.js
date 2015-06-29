var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    stylus = require("gulp-stylus");

gulp.task("js", function () {
    gulp.src([  "./assets/js/lib/underscore-1.8.3.min.js",
                "./assets/js/lib/jquery-ajax-2.1.1.min.js",
                "./assets/js/lib/backbone-1.1.2.min.js",
                "./assets/js/lib/require-2.1.17.min.js",
                "./assets/js/conf/*.js",
                "./assets/js/models/*.js",
                "./assets/js/views/*.js",
                "./assets/js/voidscout.js" ])
        .pipe(sourcemaps.init())
        .pipe(concat("script.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./assets/build/"));
});

gulp.task("css", function () {
    gulp.src([  "./assets/css/style.styl",
                "./assets/css/ctrl/*.styl"])
        .pipe(stylus())
        .pipe(concat("style.css"))
        .pipe(gulp.dest("./assets/build"));
});

gulp.task("watch", function () {
    gulp.watch(["./assets/js/**/*.js", "!./assets/build.js"], ["js"]);
    gulp.watch(["./assets/css/**/*.styl"], ["css"]);
});

gulp.task("default", ["js", "css", "watch"]);

const autoprefixer = require("autoprefixer");
const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const terser = require('gulp-terser');
/*
----------------------------------------
PATHS
----------------------------------------
- All paths are relative to the
  theme root
- Don't use a trailing `/` for path
  names
----------------------------------------
*/

// Project Sass source directory
const PROJECT_SASS_SRC = "assets/scss";

// Images source directory
const PROJECT_IMG_SRC = "assets/img";

// Fonts source directory
const PROJECT_FONTS_SRC = "assets/fonts";

// Javascript source
const PROJECT_JS_SRC = "assets/js";

// Compiled CSS destination
const CSS_DEST = "public/css";

// Minified JS destination
const JS_DEST = "public/js";

/*
----------------------------------------
TASKS
----------------------------------------
*/

// Main styles
gulp.task("build-css", function (done) {
    var plugins = [
        // Autoprefix
        autoprefixer({
            cascade: false,
            grid: true,
        })
    ];
    return (
        gulp
            .src([`${PROJECT_SASS_SRC}/*.scss`])
            .pipe(sourcemaps.init({ largeFile: true }))
            .pipe(sass())
            .pipe(cssnano())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(`${CSS_DEST}`))
    );
});

// Build main JS
gulp.task("build-js", function (done) {
    return (
        gulp
            .src([`${PROJECT_JS_SRC}/*.js`])
            .pipe(sourcemaps.init({ largeFile: true }))
            .pipe(terser())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(`${JS_DEST}`))
    );
});

// Build Components
gulp.task("build-components-css", function (done) {
    var plugins = [
        // Autoprefix
        autoprefixer({
            cascade: false,
            grid: true,
        })
    ];
    return (
        gulp
            .src([`${PROJECT_SASS_SRC}/03 - components/*.scss`])
            .pipe(sourcemaps.init({ largeFile: true }))
            .pipe(sass())
            .pipe(cssnano())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(`${CSS_DEST}/components`))
    );
});



// Build components JS
gulp.task("build-components-js", function (done) {
    return (
        gulp
            .src([`${PROJECT_JS_SRC}/components/*.js`])
            .pipe(sourcemaps.init({ largeFile: true }))
            .pipe(terser())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(`${JS_DEST}/components`))
    );
});

// Build Pages
gulp.task("build-pages-css", function (done) {
    var plugins = [
        // Autoprefix
        autoprefixer({
            cascade: false,
            grid: true,
        })
    ];
    return (
        gulp
            .src([`${PROJECT_SASS_SRC}/04 - pages/*.css`])
            .pipe(sourcemaps.init({ largeFile: true }))
            .pipe(sass())
            .pipe(cssnano())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(`${CSS_DEST}/pages`))
    );
});

// Build pages JS
gulp.task("build-pages-js", function (done) {
    return (
        gulp
            .src([`${PROJECT_JS_SRC}/pages/*.js`])
            .pipe(sourcemaps.init({ largeFile: true }))
            .pipe(terser())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(`${JS_DEST}/pages`))
    );
});

gulp.task(
    "init",
    gulp.series(
        "build-css",
        "build-components-css",
        "build-pages-css",
        "build-components-js",
        "build-pages-js",
    ) 
);

gulp.task("watch-sass", function () {
    gulp.watch(`${PROJECT_SASS_SRC}/**/*.scss`, gulp.series("build-css", "build-components-css", "build-pages-css"));
});
gulp.task('watch-js', function () {
  gulp.watch(`${PROJECT_JS_SRC}/**/*.js`, gulp.series("build-js", "build-components-js", "build-pages-js"));
});

gulp.task("build-components", gulp.series("build-components-css", "build-components-js"));
gulp.task("build-pages", gulp.series("build-pages-css", "build-pages-js"));
gulp.task("default", gulp.series("build-css", "build-js", "build-components", "build-pages"));
gulp.task("watch", gulp.series("default", gulp.parallel("watch-sass", "watch-js")));

let gulp = require("gulp"),
  sass = require("gulp-dart-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  notify = require("gulp-notify"),
  browserSync = require("browser-sync").create(),
  cleanCSS = require("gulp-clean-css"),
  postcss = require("gulp-postcss");
// assets = require("postcss-assets");

gulp.task("scripts", function () {
  return gulp
    .src(["../../node_modules/bootstrap/js/src/modal.js", "src/js/scripts.js"])
    .pipe(concat("assets/js/scripts.js"))
    .pipe(gulp.dest("."))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest("."))
    .pipe(notify({ message: "Scripts task complete" }));
});

gulp.task("compile-styles", function () {
  return gulp
    .src("src/sass/theme.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(gulp.dest("."))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS("level: 2"))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream())
    .pipe(notify({ message: "Styles task complete" }));
});

gulp.task("serve", function () {
  browserSync.init({
    proxy: "http://localhost:10088/",
  });

  gulp.watch(
    ["src/sass/**/*.scss", "!./node_modules/", "!./.git/"],
    gulp.series("compile-styles")
  );

  gulp
    .watch([
      "./**/*.*",
      "!./node_modules/",
      "!./.git/",
      "!./**/*.scss",
      "!./theme.css",
      "!./theme.min.css",
    ])
    .on("change", browserSync.reload);
});

gulp.task("styles", gulp.series("compile-styles"));

gulp.task("watch", function () {
  gulp.watch(
    ["src/sass/**/*.scss", "!./node_modules/", "!./.git/"],
    gulp.series("compile-styles")
  );
});

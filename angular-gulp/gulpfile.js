import gulp from "gulp";
import ts from "gulp-typescript";
import imagemin from "gulp-imagemin";
import dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

// Minificar seus arquivos TypeScript
gulp.task("minify-ts", function () {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      ts({
        noImplicitAny: true,
        experimentalDecorators: true,
        outDir: "output.js",
      })
    )
    .pipe(gulp.dest("dist/js"));
});

// Comprimir as imagens
gulp.task("minify-images", function () {
  return gulp
    .src("src/**/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

// Minificar Sass
gulp.task("compile-sass", function () {
  return gulp
    .src("src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

// Tarefa que executa todas as tarefas declaradas no parametro da função Parallel
gulp.task(
  "default",
  gulp.parallel("compile-sass", "minify-ts", "minify-images")
);

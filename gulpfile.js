var gulp = require("gulp");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var concat = require('gulp-concat')
var imagemin = require('gulp-imagemin');
var prefix = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var browserSync = require("browser-sync").create();

var paths = {
  styles: {
    src: "src/sass/**/*.scss",
    dest: "dist/styles"
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/scripts"
  },
  vendor: {
    src: "src/vendor/**/*.js",
    dest: "dist/scripts/vendor"
  },
  assets: {
    src: "src/assets/**/*",
    dest: "dist/assets"
  },
  pug: {
    src: "src/pug/*.pug",
    watch: "src/pug/**/*.pug",
    dest: "dist"
  },
  images: {
    src: ["src/img/**/*.jpg", "src/img/**/*.JPG", "src/img/**/*.png", "src/img/**/*.ico", "src/img/**/*.json"],
    dest: "dist/images"
  }
}

var sassOptions = {
  outputStyle: "expanded"
}

var prefixerOptions = {
  browsers: ['last 2 versions']
}

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('pug', function() {
  var stream = gulp.src(paths.pug.src)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.pug.dest));
  return stream;
});

gulp.task('styles', function() {
  var stream = gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(prefix(prefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
  return stream;
});

gulp.task('vendor', function () {
  var stream = gulp.src(paths.vendor.src)
    .pipe(gulp.dest(paths.vendor.dest));
  return stream;
});

gulp.task('assets', function () {
  var stream = gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest));
  return stream;
});

gulp.task('scripts', function() {
  var stream = gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
  return stream;
});

gulp.task('images', function() {
  var stream = gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
  return stream;
});

gulp.task('browser', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch(paths.pug.watch, { usePolling: true, interval: 200 }, gulp.parallel('pug'))
    .on('change', browserSync.reload);

  gulp.watch(paths.styles.src, { usePolling: true, interval: 200 }, gulp.parallel('styles'))
    .on('change', browserSync.reload);

  gulp.watch(paths.scripts.src, { usePolling: true, interval: 200 }, gulp.parallel('scripts'))
    .on('change', browserSync.reload);

  gulp.watch(paths.images.src, { usePolling: true, interval: 200 }, gulp.parallel('images'))
    .on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean',
  gulp.parallel(
    'pug',
    'styles',
    'vendor',
    'assets',
    'scripts',
    'images'
    )));

gulp.task('serve', gulp.series('clean',
  gulp.parallel(
    'pug',
    'styles',
    'vendor',
    'assets',
    'scripts',
    'images'
  ),
  'browser'
));

gulp.task('default', gulp.series('serve'));
var gulp = require('gulp'),
  path = require('path'),
  merge = require('merge-stream'),
  compass = require('gulp-compass'),
  runSequence = require('run-sequence'),
  watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  jade = require('gulp-jade'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  livereload = require('gulp-livereload'),
  rename = require('gulp-rename');

// Create Static site for cms
gulp.task('templates', function() {
  gulp.src(['./views/**/*.jade', './views/index.jade', '!./views/{templates,templates/**}', '!./views/{includes,includes/**}'], {base: './views'})
    .pipe(jade({
      data: {
        cms: true
      }
    }))
    .pipe(gulp.dest('./taylor-studio.cms/'))
});

gulp.task('compass', function() {
  return gulp.src('public/sass/**/style.scss')
    .pipe(compass({
      css: 'public/css', 
      sass: 'public/sass', 
      image: 'public/images'
    }))
    .pipe(gulp.dest('public/css'));
})


gulp.task('minimize-css', function() {
  return gulp.src('public/css/style.css')
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('compass-gt-ie8', function() {
  return gulp.src('public/sass/**/gt-ie8.scss')
    .pipe(compass({
      css: 'public/css', 
      sass: 'public/sass', 
      image: 'public/images'
    }))
    .pipe(gulp.dest('public/css'));
})

gulp.task('uglify-js', function() {
  return gulp.src('public/js/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
  gulp.watch('public/sass/style.scss', ['optimize-css']);
  gulp.watch('public/js/**/*.js', ['optimize-js']);
});


//gulp.task('minimize-css', function() {
  //return gulp.src('public/css/concat.css')
    //.pipe(minifyCSS())
    //.pipe(rename('style.min.css'))
    //.pipe(gulp.dest('public/css'));
//});

gulp.task('optimize-css', 
  function() {
    runSequence('compass', 'minimize-css');
});

gulp.task('optimize-js', 
  function() {
    runSequence('uglify-js');
});

gulp.task('default', 
  function() {
    runSequence('watch', 'optimize-css', 'optimize-js');
});

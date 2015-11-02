var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var compass = require('gulp-compass');
var livereload = require('gulp-livereload');
var http = require('http');
var st = require('st');

gulp.task('compass', function() {
  gulp.src(['sass/*.scss', '!sass/variables.scss', '!sass/function.scss'])
    .pipe(compass({
      css: 'css',
      sass: 'sass',
      sourcemap: true
    }))
    .on('error', plugins.notify.onError("Error: <%= error.message %>"))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('jsmin', function() {
  gulp.src('js/*.js')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('/'))
    .pipe(gulp.dest('js/min'))
    .pipe(livereload());
});

gulp.task('watchhtml', function(){
  gulp.src('*.html')
    .pipe(livereload());
});

gulp.task('watch', ['server'], function() {
  livereload.listen({ start: true });
  gulp.watch('sass/*.scss', ['compass']);
  gulp.watch('js/*.js', ['jsmin']);
  gulp.watch('*.html', ['watchhtml']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname, index: 'index.html', cache: false })
  ).listen(8000, done);
});

gulp.task('default', ['watch']);
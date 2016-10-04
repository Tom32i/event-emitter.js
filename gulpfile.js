const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const header = require('gulp-header');
const meta = require('./package.json');

const banner = [
  '/*!',
  ' * <%= name %> <%= version %>',
  ' * <%= homepage %>',
  ' * Copyright 2016 <%= author.name %>',
  ' */\n\n'
].join('\n');

/**
 * On error
 *
 * @param {Error} error
 */
function onError(error) {
  console.error(error);
  this.emit('end');
}

/*gulp.task('jshint', function() {
    gulp.src(srcDir + '** /*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});*/

gulp.task('full', function() {
  return browserify('./src/EventEmitter.js', { debug: true })
    .transform(babelify)
    .bundle()
    .on('error', onError)
    .pipe(source(`event-emitter.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(header(banner, meta))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('min', function(){
  return browserify('./src/EventEmitter.js', { debug: false })
    .transform(babelify)
    .bundle()
    .on('error', onError)
    .pipe(source(`event-emitter.min.js`))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(header(banner, meta))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', [/*'jshint',*/ 'full', 'min']);

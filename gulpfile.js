var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');

gulp.task('typescript', function() {

    var ts_root = gulp.src('cognitive/app/static/ts/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            sortOutput: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('cognitive/app/static/ts/build/'));

    var ts_components = gulp.src('cognitive/app/static/ts/components/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            sortOutput: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('cognitive/app/static/ts/build/components'));

    return merge(ts_components, ts_root);
});

gulp.task('watch', ['typescript'], function() {
    gulp.watch('cognitive/app/static/ts/*.ts', ['typescript']);
    gulp.watch('cognitive/app/static/ts/components/*.ts', ['typescript']);
});
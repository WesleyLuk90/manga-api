const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

const config = {
    helpers: [
        'spec/helpers/**/*.js',
    ],
};
const jasmineConfig = { config, includeStackTrace: true };

const allSpecs = 'spec/**/*.spec.js';
const repoSpecs = 'spec/Repositories.spec.js';

const nonRepoSpecs = [allSpecs, `!${repoSpecs}`];
const watchFiles = ['sdk/**/*.js', 'repositories/**/*.js', 'spec/**/*.spec.js', 'spec/repository-data/*.data.js'];

function catchError(e) {
    this.emit('end');
}

gulp.task('test', () =>
    gulp
    .src(nonRepoSpecs)
    .pipe(jasmine(jasmineConfig)));

gulp.task('test:ignore-errors', () =>
    gulp
    .src(nonRepoSpecs)
    .pipe(jasmine(jasmineConfig))
    .on('error', catchError));

gulp.task('test:watch', ['test:ignore-errors'], () =>
    gulp.watch(watchFiles, ['test:ignore-errors']));

gulp.task('test-repo', () =>
    gulp
    .src(['spec/Repositories.spec.js'])
    .pipe(jasmine(jasmineConfig)));
gulp.task('test-repo:ignore-errors', () =>
    gulp
    .src(['spec/Repositories.spec.js'])
    .pipe(jasmine(jasmineConfig))
    .on('error', catchError));

gulp.task('test-repo:watch', ['test-repo:ignore-errors'], () =>
    gulp.watch(watchFiles, ['test-repo:ignore-errors']));

gulp.task('default', () =>
    gulp
    .src(allSpecs)
    .pipe(jasmine(jasmineConfig))
    .on('err', catchError));

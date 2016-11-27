const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

const config = {
    helpers: [
        'spec/helpers/**/*.js',
    ],
};

const nonRepoSpecs = ['spec/**/*.spec.js', '!spec/Repositories.spec.js'];
const watchFiles = ['sdk/**/*.js', 'repositories/**/*.js', 'spec/**/*.spec.js'];

gulp.task('test', () => {
    gulp.src(nonRepoSpecs)
        .pipe(jasmine({ config, includeStackTrace: true }))
        .on('error', () => {});
});

gulp.task('test:watch', ['test'], () => {
    gulp.watch(watchFiles, ['test']);
});

gulp.task('test-repo', () => {
    gulp.src(['spec/**/*.spec.js', '!spec/Repositories.spec.js'])
        .pipe(jasmine({ config }));
});

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

gulp.task('test', () => {
    gulp.src(nonRepoSpecs)
        .pipe(jasmine(jasmineConfig))
        .on('error', () => {});
});

gulp.task('test:watch', ['test'], () => {
    gulp.watch(watchFiles, ['test']);
});

gulp.task('test-repo', () => {
    gulp.src(['spec/Repositories.spec.js'])
        .pipe(jasmine(jasmineConfig))
        .on('error', () => {});
});


gulp.task('test-repo:watch', ['test-repo'], () => {
    gulp.watch(watchFiles, ['test-repo']);
});

gulp.task('default', () => {
    gulp.src(allSpecs)
        .pipe(jasmine(jasmineConfig))
        .on('err', () => {});
});

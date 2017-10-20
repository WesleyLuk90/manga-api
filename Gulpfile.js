const gulp = require('gulp');
const Jasmine = require('jasmine');
const jasmine = new Jasmine();

const allSpecs = '**/*.spec.js';
const repoSpecs = 'Repositories.spec.js';

const nonRepoSpecs = [allSpecs, `!${repoSpecs}`];
const watchFiles = ['sdk/**/*.js', 'repositories/**/*.js', 'spec/**/*.spec.js', 'spec/repository-data/*.data.js'];

jasmine.loadConfig({
    spec_dir: 'spec',
    spec_files: [
        '**/*.spec.js',
    ],
    helpers: [
        'helpers/**/*.js',
    ],
});


function catchError() {
    this.emit('end');
}

gulp.task('test', (done) => {
    jasmine.execute();
    jasmine.onComplete((passed) => {
        if (passed) {
            console.log('All specs have passed');
        } else {
            console.log('At least one spec has failed');
        }
        done();
    });
});

// gulp.task('test:ignore-errors', () =>
//     gulp
//     .src(nonRepoSpecs)
//     .pipe(jasmine(jasmineConfig))
//     .on('error', catchError));

// gulp.task('test:watch', ['test:ignore-errors'], () =>
//     gulp.watch(watchFiles, ['test:ignore-errors']));

// gulp.task('test-repo', () =>
//     gulp
//     .src(['spec/Repositories.spec.js'])
//     .pipe(jasmine(jasmineConfig)));
// gulp.task('test-repo:ignore-errors', () =>
//     gulp
//     .src(['spec/Repositories.spec.js'])
//     .pipe(jasmine(jasmineConfig))
//     .on('error', catchError));

// gulp.task('test-repo:watch', ['test-repo:ignore-errors'], () =>
//     gulp.watch(watchFiles, ['test-repo:ignore-errors']));

// gulp.task('default', () =>
//     gulp
//     .src(allSpecs)
//     .pipe(jasmine(jasmineConfig))
//     .on('err', catchError));

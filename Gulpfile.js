const gulp = require('gulp');
const Jasmine = require('jasmine');

const allSpecs = '**/*.spec.js';
const repoSpecs = 'Repositories.spec.js';

function setupTest(taskName, files) {
    gulp.task(taskName, (done) => {
        const jasmine = new Jasmine();
        jasmine.loadConfig({
            spec_dir: 'spec',
            spec_files: files,
            helpers: [
                'helpers/**/*.js',
            ],
        });
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
}

setupTest('test', [allSpecs]);
setupTest('test:unit', [allSpecs, `!${repoSpecs}`]);

gulp.task('default', ['test']);

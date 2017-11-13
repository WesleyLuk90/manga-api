const gulp = require('gulp');
const Jasmine = require('jasmine');
const minimist = require('minimist');

const sdkSpecs = 'sdk/*.spec.js';
const repositoriesSpecs = 'repositories/*.spec.js';
const suiteSpecs = 'suite/*.spec.js';
const args = minimist(process.argv.slice(2));

function setupTest(taskName, files) {
    gulp.task(taskName, (done) => {
        const jasmine = new Jasmine();
        jasmine.loadConfig({
            spec_dir: 'spec',
            spec_files: files,
            helpers: [
                'helpers/**/*.js',
            ],
            filter: 'abc',
        });

        const env = jasmine.jasmine.getEnv();
        env.specFilter = (spec) => {
            if (args.filter) {
                return spec.getFullName().indexOf(args.filter) > -1;
            }
            return true;
        };
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

setupTest('test', [sdkSpecs, repositoriesSpecs, suiteSpecs]);
setupTest('test:unit', [sdkSpecs]);
setupTest('test:repository', [repositoriesSpecs]);
setupTest('test:suite', [suiteSpecs]);

gulp.task('default', ['test']);

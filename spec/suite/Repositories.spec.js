const TestFactory = require('./TestFactory');
const RepositoryListFactory = require('../../repositories/RepositoryListFactory');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

function allRepositories() {
    const list = RepositoryListFactory
        .create();
    return [...list.getAll(), list.get('MockRepository')];
}

function createTests() {
    allRepositories()
        .filter((repo) => {
            return !args.repository || repo.getName() === args.repository;
        }).forEach((repo) => {
            TestFactory.createDefaultTests(repo);
        });
}
try {
    createTests();
} catch (e) {
    console.error(e.stack);
}

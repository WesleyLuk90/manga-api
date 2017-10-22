const TestFactory = require('./TestFactory');
const RepositoryListFactory = require('../../repositories/RepositoryListFactory');

function allRepositories() {
    const list = RepositoryListFactory
        .create();
    return [...list.getAll(), list.get('MockRepository')];
}

function createTests() {
    const index = process.argv.indexOf('--repository');
    const singleRepository = index > -1 ? process.argv[index + 1] : null;
    allRepositories()
        .filter((repo) => {
            return !singleRepository || repo.getName() === singleRepository;
        }).forEach((repo) => {
            TestFactory.createDefaultTests(repo);
        });
}
try {
    createTests();
} catch (e) {
    console.error(e.stack);
}

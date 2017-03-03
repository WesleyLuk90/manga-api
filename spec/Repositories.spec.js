const RepositoryListFactory = require('../repositories/RepositoryListFactory');
const setupSuite = require('./repository-suite');

function createTests() {
    const index = process.argv.indexOf('--repository');
    if (index > -1) {
        const name = process.argv[index + 1];
        const repo = RepositoryListFactory
            .create()
            .get(name);
        if (!repo) {
            console.error(`Repository ${name} does not exist`);
            return;
        }
        setupSuite(repo);
    } else {
        const list = RepositoryListFactory
            .create();
        list.getAll()
            .forEach((repository) => {
                setupSuite(repository);
            });
        setupSuite(list.get('MockRepository'));
    }
}
try {
    createTests();
} catch (e) {
    console.error(e.stack);
}

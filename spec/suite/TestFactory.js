const FixtureLoader = require('./FixtureLoader');
const setupRepositoryTest = require('./repository-suite/Repository');
const setupHandleTest = require('./repository-suite/Handle');
const setupMangaTests = require('./repository-suite/Manga');
const setupChapterTests = require('./repository-suite/Chapter');
const setupPageTests = require('./repository-suite/Page');
const setupSearchTest = require('./repository-suite/Search');
const setupListLatestTest = require('./repository-suite/ListLatest');

module.exports = class TestFactory {
    static createTests(repository, fixture) {
        describe(repository.getName(), () => {
            setupRepositoryTest(repository);
            setupHandleTest(repository);
            setupSearchTest(repository);
            setupListLatestTest(repository, fixture);
            setupMangaTests(repository, fixture);
            setupChapterTests(repository, fixture);
            setupPageTests(repository, fixture);
        });
    }

    static createDefaultTests(repository) {
        const fixture = FixtureLoader.loadDefaultFixture(repository);
        return this.createTests(repository, fixture);
    }
};

const setupRepositoryTest = require('./Repository');
const loadFixture = require('./fixtures');
const setupHandleTest = require('./handles');
const setupCapabilitiesTest = require('./Capabilities');
const setupMangaTests = require('./Manga');
const setupChapterTests = require('./Chapter');
const setupPageTests = require('./Page');

module.exports = function setupSuite(repository) {
    describe(repository.getName(), () => {
        const fixture = loadFixture(repository);
        setupRepositoryTest(repository);
        setupHandleTest(repository);
        setupCapabilitiesTest(repository);
        if (fixture) {
            setupMangaTests(repository, fixture.manga_tests);
            setupChapterTests(repository, fixture.chapter_tests);
            setupPageTests(repository, fixture.page_tests);
        }
    });
};

const bluebird = require('bluebird');
const AbstractGetChapterOperation = require('../../../sdk/operations/AbstractGetChapterOperation');
const Assertions = require('../Assertions');
const ChapterHandle = require('../../../sdk/ChapterHandle');

module.exports = function setupChapterTests(repository, fixture) {
    if (!Assertions.assertOperationFixture(repository, AbstractGetChapterOperation, fixture, 'chapter_tests')) {
        return;
    }

    it('should get chapter data', () => {
        return bluebird.mapSeries(fixture.chapter_tests, (chapter) => {
            const chapterHandle = ChapterHandle.unserialize(chapter.handle);
            expect(repository.isForHandle(chapterHandle)).toBe(true);
            return repository.getChapter(chapterHandle)
                .then((chapterResults) => {
                    Assertions.assertDataMatches(chapterResults, chapter.results, ['pages']);
                    Assertions.assertHandlesArray(chapterResults.pages, chapter.results.pages);
                })
                .then(null, (e) => {
                    console.log('got an error', e);
                    throw e;
                });
        });
    });
};

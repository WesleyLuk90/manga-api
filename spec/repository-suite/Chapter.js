const bluebird = require('bluebird');
const assertDataMatches = require('./util').assertDataMatches;
const assertHandlesArray = require('./util').assertHandlesArray;
const ChapterHandle = require('../../sdk/ChapterHandle');

module.exports = function setupChapterTests(repository, chapters) {
    if (!chapters) {
        console.warn(`No chapter test data for ${repository.getName()}`);
        return;
    }
    it('should get chapter data', () => {
        return bluebird.mapSeries(chapters, (chapter) => {
            const chapterHandle = ChapterHandle.unserialize(chapter.handle);
            expect(repository.isForHandle(chapterHandle)).toBe(true);
            return repository.getChapter(chapterHandle)
                .then((chapterResults) => {
                    assertDataMatches(chapterResults, chapter.results, ['pages']);
                    assertHandlesArray(chapterResults.pages, chapter.results.pages);
                })
                .then(null, (e) => {
                    console.log('got an error', e);
                    throw e;
                });
        });
    });
};

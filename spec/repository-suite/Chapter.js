const Rx = require('rx');
const assertDataMatches = require('./util').assertDataMatches;
const assertHandlesArray = require('./util').assertHandlesArray;
const ChapterHandle = require('../../sdk/ChapterHandle');

module.exports = function setupChapterTests(repository, chapter) {
    if (!chapter) {
        console.warn(`No chapter test data for ${repository.getName()}`);
        return;
    }
    it('should get chapter data', (done) => {
        Rx.Observable.from(chapter)
            .flatMapWithMaxConcurrent(1, chapterTest => Rx.Observable.defer(() => {
                const chapterHandle = ChapterHandle.unserialize(chapterTest.handle);
                expect(repository.isForHandle(chapterHandle)).toBe(true);
                return repository.getChapter(chapterHandle)
                    .then((chapterResults) => {
                        assertDataMatches(chapterResults, chapterTest.results, ['pages']);
                        assertHandlesArray(chapterResults.pages, chapterTest.results.pages);
                    })
                    .then(null, (e) => {
                        console.log('got an error', e);
                        throw e;
                    });
            }))
            .finally(done)
            .subscribe(() => {}, fail);
    });
};

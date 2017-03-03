const MangaHandle = require('../../sdk/MangaHandle');
const Rx = require('rx');
const assertDataMatches = require('./util').assertDataMatches;
const assertHandlesArray = require('./util').assertHandlesArray;

module.exports = function setupMangaTests(repository, manga) {
    it('should get manga data', (done) => {
        Rx.Observable.from(manga)
            .flatMapWithMaxConcurrent(1, mangaTest => Rx.Observable.defer(() => {
                const mangaHandle = MangaHandle.unserialize(mangaTest.handle);
                expect(repository.isForHandle(mangaHandle)).toBe(true);
                return repository.getManga(mangaHandle)
                    .then((mangaResults) => {
                        assertDataMatches(mangaResults, mangaTest.results, ['chapters']);
                        assertHandlesArray(mangaResults.chapters, mangaTest.results.chapters);
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

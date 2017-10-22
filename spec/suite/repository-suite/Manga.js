const bluebird = require('bluebird');
const AbstractGetMangaOperation = require('../../../sdk/operations/AbstractGetMangaOperation');
const Assertions = require('../Assertions');
const MangaHandle = require('../../../sdk/MangaHandle');

module.exports = function setupMangaTests(repository, fixture) {
    Assertions.assertOperationFixture(repository, AbstractGetMangaOperation, fixture, 'manga_tests');

    it('should get manga data', () => {
        return bluebird.mapSeries(fixture.manga_tests, (manga) => {
            const mangaHandle = MangaHandle.unserialize(manga.handle);
            expect(repository.isForHandle(mangaHandle)).toBe(true);
            return repository.getManga(mangaHandle)
                .then((mangaResults) => {
                    Assertions.assertDataMatches(mangaResults, manga.results, ['chapters']);
                    Assertions.assertHandlesArray(mangaResults.chapters, manga.results.chapters);
                })
                .then(null, (e) => {
                    console.log('got an error', e);
                    throw e;
                });
        });
    });
};

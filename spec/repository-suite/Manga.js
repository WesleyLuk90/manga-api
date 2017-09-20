const bluebird = require('bluebird');
const MangaHandle = require('../../sdk/MangaHandle');
const assertDataMatches = require('./util').assertDataMatches;
const assertHandlesArray = require('./util').assertHandlesArray;

module.exports = function setupMangaTests(repository, mangas) {
    if (!mangas) {
        console.warn(`No manga test data for ${repository.getName()}`);
        return;
    }

    it('should get manga data', () => {
        return bluebird.mapSeries(mangas, (manga) => {
            const mangaHandle = MangaHandle.unserialize(manga.handle);
            expect(repository.isForHandle(mangaHandle)).toBe(true);
            return repository.getManga(mangaHandle)
                .then((mangaResults) => {
                    assertDataMatches(mangaResults, manga.results, ['chapters']);
                    assertHandlesArray(mangaResults.chapters, manga.results.chapters);
                })
                .then(null, (e) => {
                    console.log('got an error', e);
                    throw e;
                });
        });
    });
};

const MangaHandle = require('../../sdk/MangaHandle');

module.exports = function setupCapabilitiesTest(repository) {
    describe('capabilities', () => {
        const cap = repository.getCapabilities();
        if (cap.supportsSearching()) {
            it('should search', (done) => {
                repository.search()
                    .then((results) => {
                        expect(Array.isArray(results)).toBe(true);
                        expect(results.length > 0).toBe(true);
                        expect(results.every(m => m instanceof MangaHandle))
                            .toBe(true);
                        if (cap.supportsUrlMangaHandles()) {
                            results.forEach(r =>
                                expect(typeof r.getUrl()).toBe('string'));
                        }
                    })
                    .catch(fail)
                    .then(done);
            });
        }
        if (cap.supportsListingLatest()) {
            it('should list latest', (done) => {
                repository.listLatest()
                    .then((results) => {
                        expect(Array.isArray(results)).toBe(true);
                        expect(results.length > 0).toBe(true);
                        expect(results.every(m => m instanceof MangaHandle))
                            .toBe(true);
                        if (cap.supportsUrlMangaHandles()) {
                            results.forEach(r =>
                                expect(typeof r.getUrl()).toBe('string'));
                        }
                    })
                    .catch(fail)
                    .then(done);
            });
        }
    });
};

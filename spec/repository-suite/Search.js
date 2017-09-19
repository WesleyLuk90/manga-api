import AbstractSearchOperation from '../../sdk/AbstractSearchOperation';
module.exports = function setupSearchTest(repository) {
    if (!repository.getOperation(AbstractSearchOperation)) {
        return;
    }

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

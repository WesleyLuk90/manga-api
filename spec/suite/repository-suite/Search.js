const AbstractSearchOperation = require('../../../sdk/AbstractSearchOperation');
const MangaHandle = require('../../../sdk/MangaHandle');

module.exports = function setupSearchTest(repository) {
    if (!repository.getOperation(AbstractSearchOperation)) {
        return;
    }

    it('should search', () => {
        return repository.search()
            .then((results) => {
                expect(Array.isArray(results)).toBe(true);
                expect(results.length > 0).toBe(true);
                expect(results.every(m => m instanceof MangaHandle))
                    .toBe(true);
                results.forEach(r =>
                    expect(typeof r.getUrl()).toBe('string'));
            });
    });
};

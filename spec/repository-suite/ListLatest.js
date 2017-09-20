const AbstractListLatestOperation = require('../../sdk/AbstractListLatestOperation');
const MangaHandle = require('../../sdk/MangaHandle');

module.exports = function setupListLatestTest(repository) {
    if (!repository.getOperation(AbstractListLatestOperation)) {
        return;
    }

    it('should list latest', () => {
        return repository.listLatest()
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

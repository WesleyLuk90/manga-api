const RepositoryListFactory = require('../repositories/RepositoryListFactory');
const MangaHandle = require('../sdk/MangaHandle');

describe('Repository', () => {
    RepositoryListFactory
        .create()
        .getAll()
        .forEach((repository) => {
            describe(repository, () => {
                it('should search', (done) => {
                    repository.search()
                        .then((results) => {
                            expect(results.length > 0).toBe(true);
                            results
                                .forEach(result =>
                                    expect(result instanceof MangaHandle).toBe(true));
                        })
                        .catch(fail)
                        .then(done);
                });
            });
        });
});

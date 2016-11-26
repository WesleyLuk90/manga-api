const RepositoryList = require('../repositories/RepositoryList');
const RepositoryListFactory = require('../repositories/RepositoryListFactory');

describe('RepositoryList', () => {
    it('should create a repository list', () => {
        const list = RepositoryListFactory.create();
        expect(list instanceof RepositoryList).toBe(true);
    });
});

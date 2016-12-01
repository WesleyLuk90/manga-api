const RepositoryList = require('../repositories/RepositoryList');
const RepositoryListFactory = require('../repositories/RepositoryListFactory');

describe('RepositoryList', () => {
    it('should create a repository list', () => {
        const list = RepositoryListFactory.create();
        expect(list instanceof RepositoryList).toBe(true);
    });

    it('should get repositories by name', () => {
        const list = new RepositoryList();
        expect(list.get('unknown')).toBe(null);
        const testRepo = { getName() { return 'somerepo'; } };
        list.add(testRepo);
        expect(list.get('somerepo')).toBe(testRepo);
    });

    it('should not list the mock repository', () => {
        const list = RepositoryListFactory.create();
        list.getAll().forEach((repo) => {
            expect(repo.getName()).not.toBe('MockRepository');
        });
    });
});

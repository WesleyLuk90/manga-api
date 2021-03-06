const RepositoryList = require('../../repositories/RepositoryList');
const RepositoryListFactory = require('../../repositories/RepositoryListFactory');
const MockRepository = require('../../repositories/MockRepository/MockRepository');
const MangaHandle = require('../../sdk/MangaHandle');

describe('RepositoryList', () => {
    it('should create a repository list', () => {
        const list = RepositoryListFactory.create();
        expect(list instanceof RepositoryList).toBe(true);
    });

    it('should get repositories by name', () => {
        const list = new RepositoryList();
        expect(list.get('unknown')).toBe(null);
        const testRepo = {
            getName() {
                return 'some repo';
            },
        };
        list.add(testRepo);
        expect(list.get('some repo')).toBe(testRepo);
    });

    it('should not list the mock repository', () => {
        const list = RepositoryListFactory.create();
        list.getAll().forEach((repo) => {
            expect(repo.getName()).not.toBe('MockRepository');
        });
    });

    it('should get the repository for a handle', () => {
        const list = RepositoryListFactory.create();
        expect(list.getRepositoryForHandle(MangaHandle.fromUrl('nothing'))).toBe(null);
        expect(list.getRepositoryForHandle(MangaHandle.fromUrl('mock://stuff'))).toEqual(jasmine.any(MockRepository));
    });
});

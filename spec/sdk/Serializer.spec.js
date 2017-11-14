const RepositoryListFactory = require('../../repositories/RepositoryListFactory');

describe('Serializer', () => {
    it('should serialize and deserialize visitors', () => {
        const list = RepositoryListFactory.create();
        const repo = list.get('MockRepository');

        let index = 0;
        const visitor = repo.listLatest();
        return visitor.visit(() => {
                return index++ < 5;
            })
            .then(() => {
                const visitorData = list.getSerializer().serializeMangaVisitor(repo, visitor);
                const visitorCopy = list.getSerializer().deserializeMangaVisitor(visitorData);
                expect(visitorCopy).not.toBe(visitor);
                expect(visitorCopy).toEqual(visitor);
            });
    });
});

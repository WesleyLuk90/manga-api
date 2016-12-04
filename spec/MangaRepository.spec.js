const MangaRepository = require('../sdk/MangaRepository');

describe('MangaRepository', () => {
    it('should have abstract methods', () => {
        const repo = new MangaRepository();
        expect(() => repo.search()).toThrowError(/Not Implemented/);
        expect(() => repo.getCapabilities()).toThrowError(/Not Implemented/);
        expect(() => repo.getManga()).toThrowError(/Not Implemented/);
        expect(() => repo.getChapter()).toThrowError(/Not Implemented/);
        expect(() => repo.getPage()).toThrowError(/Not Implemented/);
        expect(() => repo.isForHandle()).toThrowError(/Not Implemented/);
        expect(() => repo.listLatest()).toThrowError(/Not Implemented/);
    });
});

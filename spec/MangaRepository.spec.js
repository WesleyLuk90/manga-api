const MangaRepository = require('../sdk/MangaRepository');

describe('MangaRepository', () => {
    it('should have abstract methods', () => {
        const repo = new MangaRepository();
        expect(() => repo.search()).toThrowError(/Not Implemented/);
        expect(() => repo.getCapabilities()).toThrowError(/Not Implemented/);
    });
});

const Manga = require('../../sdk/Manga');
const MangaHandle = require('../../sdk/MangaHandle');
const MangaEntry = require('../../sdk/MangaEntry');

describe('MangaEntry', () => {
    it('should check for equality', () => {
        const entryA = MangaEntry.create(new Manga(MangaHandle.fromUrl('abc')));
        const entryB = MangaEntry.create(new Manga(MangaHandle.fromUrl('abc')));
        const entryC = MangaEntry.create(new Manga(MangaHandle.fromUrl('abcd')));
        expect(MangaEntry.equals(entryA, entryB)).toBe(true);
        expect(MangaEntry.equals(entryA, entryC)).toBe(false);
        expect(MangaEntry.equals(entryA, null)).toBe(false);
    });
});

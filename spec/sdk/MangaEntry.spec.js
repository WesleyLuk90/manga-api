const MangaHandle = require('../../sdk/MangaHandle');
const MangaEntry = require('../../sdk/MangaEntry');

describe('MangaEntry', () => {
    it('should check for equality', () => {
        const entryA = MangaEntry.create(MangaHandle.fromUrl('abc'));
        const entryB = MangaEntry.create(MangaHandle.fromUrl('abc'));
        const entryC = MangaEntry.create(MangaHandle.fromUrl('abcd'));
        expect(MangaEntry.equals(entryA, entryB)).toBe(true);
        expect(MangaEntry.equals(entryA, entryC)).toBe(false);
        expect(MangaEntry.equals(entryA, null)).toBe(false);
    });
});

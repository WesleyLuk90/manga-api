const ChapterHandle = require('../../sdk/ChapterHandle');
const Manga = require('../../sdk/Manga');
const MangaHandle = require('../../sdk/MangaHandle');

describe('Manga', () => {
    it('should have default values', () => {
        const someHandle = new MangaHandle();
        const manga = new Manga(someHandle);

        expect(manga.getName()).toBe(null);
        expect(manga.getAltNames()).toBe(null);
        expect(manga.getAuthors()).toBe(null);
        expect(manga.getArtists()).toBe(null);
        expect(manga.getPreviewImageUrl()).toBe(null);
        expect(manga.getReleaseYear()).toBe(null);
        expect(manga.getSummary()).toBe(null);
        expect(manga.getGenres()).toBe(null);
    });
    it('should get and set values', () => {
        const someHandle = new MangaHandle();
        const manga = new Manga(someHandle)
            .setName('name')
            .setAltNames(['name1', 'name2'])
            .setChapters([]);

        expect(manga.getName()).toBe('name');
        expect(manga.getAltNames()).toEqual(['name1', 'name2']);
        expect(manga.getChapters()).toEqual([]);
        expect(manga.getMangaHandle()).toBe(someHandle);
    });

    it('should require constructor parameters', () => {
        expect(() => new Manga()).toThrowError(/A MangaHandle is required/);
    });

    it('should require values to be set before they can be get', () => {
        const manga = new Manga(new MangaHandle());

        expect(() => manga.getChapters()).toThrowError(/No chapters set/);
        expect(() => manga.getChapter(0)).toThrowError(/No chapters set/);
    });

    it('should validate parameters', () => {
        const manga = new Manga(new MangaHandle());
        expect(() => manga.setName({})).toThrowError(/Expected a string/);
        expect(() => manga.setAltNames({})).toThrowError(/Expected an array/);
        expect(() => manga.setChapters({})).toThrowError(/chapters must be an array/);
    });

    it('should check chapter bounds', () => {
        const manga = new Manga(new MangaHandle())
            .setChapters([1, 2, 3]);
        expect(() => manga.getChapter(-1)).toThrowError(/Chapter index out of bounds, -1 must be between 0 and 2/);
        expect(() => manga.getChapter(3)).toThrowError(/Chapter index out of bounds, 3 must be between 0 and 2/);
    });
});

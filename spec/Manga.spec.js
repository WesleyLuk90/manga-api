const Manga = require('../sdk/Manga');
const MangaHandle = require('../sdk/MangaHandle');

describe('Manga', () => {
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

        expect(() => manga.getName()).toThrowError(/No name set/);
        expect(() => manga.getAltNames()).toThrowError(/No alt names set/);
        expect(() => manga.getChapters()).toThrowError(/No chapters set/);
        expect(() => manga.getChapter(0)).toThrowError(/No chapters set/);
    });

    it('should validate parameters', () => {
        const manga = new Manga(new MangaHandle());
        expect(() => manga.setName({})).toThrowError(/name must be a string/);
        expect(() => manga.setAltNames({})).toThrowError(/altNames must be an array/);
        expect(() => manga.setChapters({})).toThrowError(/chapters must be an array/);
    });
});

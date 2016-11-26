const Chapter = require('../sdk/Chapter');
const ChapterHandle = require('../sdk/ChapterHandle');

describe('Chapter', () => {
    it('should get and set values', () => {
        const someHandle = new ChapterHandle();
        const chapter = new Chapter(someHandle)
            .setTitle('some title')
            .setVolume('v 1')
            .setChapter('10.3')
            .setPages([]);

        expect(chapter.getChapterHandle()).toBe(someHandle);
        expect(chapter.getTitle()).toBe('some title');
        expect(chapter.getVolume()).toBe('v 1');
        expect(chapter.getChapter()).toBe('10.3');
        expect(chapter.getPages()).toEqual([]);
    });

    it('should require pages', () => {
        const someHandle = new ChapterHandle();
        const chapter = new Chapter(someHandle);
        expect(() => chapter.getPage(0)).toThrowError(/No pages set/);
        expect(() => chapter.getPages()).toThrowError(/No pages set/);
    });

    it('should check page index', () => {
        const someHandle = new ChapterHandle();
        const chapter = new Chapter(someHandle);
        chapter.setPages([1, 2, 3]);
        expect(() => chapter.getPage(-1)).toThrowError(/Page index out of bounds, index -1 must be between 0 and 2/);
        expect(() => chapter.getPage(3)).toThrowError(/Page index out of bounds, index 3 must be between 0 and 2/);

        expect(chapter.getPage(1)).toBe(2);
    });

    it('should require constructor parameters', () => {
        expect(() => new Chapter()).toThrowError(/A ChapterHandle is required/);
    });
});

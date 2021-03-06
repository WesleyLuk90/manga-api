const AbstractGetChapterOperation = require('../../../sdk/operations/AbstractGetChapterOperation');
const AbstractGetPageOperation = require('../../../sdk/operations/AbstractGetPageOperation');
const AbstractGetMangaOperation = require('../../../sdk/operations/AbstractGetMangaOperation');
const AbstractSearchOperation = require('../../../sdk/operations/AbstractSearchOperation');
const Manga = require('../../../sdk/Manga');
const MangaHandle = require('../../../sdk/MangaHandle');
const ChapterHandle = require('../../../sdk/ChapterHandle');
const Chapter = require('../../../sdk/Chapter');
const PageHandle = require('../../../sdk/PageHandle');
const Page = require('../../../sdk/Page');

module.exports = function setupHandleTest(repository) {
    describe('search and get manga', () => {
        if (!repository.getOperation(AbstractSearchOperation) ||
            !repository.getOperation(AbstractGetMangaOperation) ||
            !repository.getOperation(AbstractGetChapterOperation) ||
            !repository.getOperation(AbstractGetPageOperation)
        ) {
            return;
        }

        function listManga() {
            return repository.search()
                .then((results) => {
                    expect(Array.isArray(results)).toBe(true);
                    expect(results.length).not.toBeLessThan(1);
                    results.forEach(m => expect(m).toEqual(jasmine.any(MangaHandle)));
                    return results;
                });
        }

        function testGetManga(mangaHandle) {
            return repository.getManga(mangaHandle)
                .then((manga) => {
                    expect(manga).toEqual(jasmine.any(Manga));
                    expect(manga.getMangaHandle()).toEqual(jasmine.any(MangaHandle));

                    expect(Array.isArray(manga.getChapters())).toBe(true);
                    expect(manga.getChapters()
                        .every(ch => ch instanceof ChapterHandle)).toBe(true);
                    expect(manga.getChapter(0)).toBe(manga.getChapters()[0]);

                    manga.getChapters()
                        .forEach(c =>
                            expect(typeof c.getUrl()).toBe('string'));

                    return manga.getChapter(0);
                });
        }

        function testGetChapter(chapterHandle) {
            return repository.getChapter(chapterHandle)
                .then((chapter) => {
                    expect(chapter).toEqual(jasmine.any(Chapter));
                    expect(typeof chapter.getTitle()).toBe('string');
                    expect(typeof chapter.getChapter()).toBe('string');
                    expect(typeof chapter.getVolume()).toBe('string');
                    expect(Array.isArray(chapter.getPages())).toBe(true);

                    chapter.getPages().forEach((page) => {
                        expect(page).toEqual(jasmine.any(PageHandle));
                    });

                    chapter.getPages()
                        .forEach(p =>
                            expect(typeof p.getUrl()).toBe('string'));

                    return chapter.getPage(0);
                });
        }

        function testGetPage(pageHandle) {
            return repository.getPage(pageHandle)
                .then((page) => {
                    expect(page).toEqual(jasmine.any(Page));
                    expect(typeof page.getImageUrl()).toBe('string');
                });
        }

        it('should implement manga, chapters and pages', () => {
            return listManga()
                .then(mangas => testGetManga(mangas[0]))
                .then(testGetChapter)
                .then(testGetPage);
        });
    });
};

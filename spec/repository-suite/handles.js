const Manga = require('../../sdk/Manga');
const MangaHandle = require('../../sdk/MangaHandle');
const ChapterHandle = require('../../sdk/ChapterHandle');
const Chapter = require('../../sdk/Chapter');
const PageHandle = require('../../sdk/PageHandle');
const Page = require('../../sdk/Page');

module.exports = function setupHandleTest(repository) {
    describe('search and get manga', () => {
        const cap = repository.getCapabilities();

        function listManga() {
            return repository.search()
                .then((results) => {
                    expect(Array.isArray(results)).toBe(true);
                    expect(results.length).not.toBeLessThan(1);
                    results.forEach(m => expect(m).toBeInstanceOf(MangaHandle));
                    return results;
                });
        }

        function testGetManga(mangaHandle) {
            return repository.getManga(mangaHandle)
                .then((manga) => {
                    expect(manga).toBeInstanceOf(Manga);
                    expect(manga.getMangaHandle()).toBeInstanceOf(MangaHandle);

                    expect(Array.isArray(manga.getChapters())).toBe(true);
                    expect(manga.getChapters()
                        .every(ch => ch instanceof ChapterHandle)).toBe(true);
                    expect(manga.getChapter(0)).toBe(manga.getChapters()[0]);

                    if (cap.supportsUrlChapterHandles()) {
                        manga.getChapters()
                            .forEach(c =>
                                expect(typeof c.getUrl()).toBe('string'));
                    }

                    return repository.getChapter(manga.getChapter(0));
                });
        }

        it('should implement manga, chapters and pages', (done) => {
            listManga()
                .then(mangas => testGetManga(mangas[0]))
                .catch(fail)
                .then(done);
            return;
            const testMangaHandle = mangaHandles[0];
            repository.getManga(testMangaHandle)
                .then((manga) => {
                    expect(manga).toBeInstanceOf(Manga);
                    expect(manga.getMangaHandle()).toBeInstanceOf(MangaHandle);

                    expect(Array.isArray(manga.getChapters())).toBe(true);
                    expect(manga.getChapters()
                        .every(ch => ch instanceof ChapterHandle)).toBe(true);
                    expect(manga.getChapter(0)).toBe(manga.getChapters()[0]);

                    if (cap.supportsUrlChapterHandles()) {
                        manga.getChapters()
                            .forEach(c =>
                                expect(typeof c.getUrl()).toBe('string'));
                    }

                    return repository.getChapter(manga.getChapter(0));
                })
                .then((chapter) => {
                    expect(chapter).toBeInstanceOf(Chapter);
                    expect(typeof chapter.getTitle()).toBe('string');
                    expect(typeof chapter.getChapter()).toBe('string');
                    expect(typeof chapter.getVolume()).toBe('string');
                    expect(Array.isArray(chapter.getPages())).toBe(true);

                    chapter.getPages().forEach((page) => {
                        expect(page).toBeInstanceOf(PageHandle);
                    });

                    if (cap.supportsUrlPageHandles()) {
                        chapter.getPages()
                            .forEach(p =>
                                expect(typeof p.getUrl()).toBe('string'));
                    }

                    return repository.getPage(chapter.getPage(0));
                })
                .then((page) => {
                    expect(page).toBeInstanceOf(Page);
                    expect(typeof page.getImageUrl()).toBe('string');
                })
                .catch(fail)
                .then(done);
        });
    });
};
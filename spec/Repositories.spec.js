const RepositoryListFactory = require('../repositories/RepositoryListFactory');
const MangaHandle = require('../sdk/MangaHandle');
const Manga = require('../sdk/Manga');
const Chapter = require('../sdk/Chapter');
const ChapterHandle = require('../sdk/ChapterHandle');
const Page = require('../sdk/Page');
const PageHandle = require('../sdk/PageHandle');

function testRepository(repository) {
    describe(repository.getName(), () => {
        const cap = repository.getCapabilities();
        it('should search', (done) => {
            repository.search()
                .then((results) => {
                    expect(Array.isArray(results)).toBe(true);
                    expect(results.length > 0).toBe(true);
                    expect(results.every(m => m instanceof MangaHandle))
                        .toBe(true);
                    if (cap.supportsUrlMangaHandles()) {
                        results.forEach(r =>
                            expect(typeof r.getUrl()).toBe('string'));
                    }
                })
                .catch(fail)
                .then(done);
        });

        it('should get name', () => {
            expect(typeof repository.getName()).toBe('string');
        });

        it('should throw errors for invalid paramters', () => {
            expect(() => repository.getManga({})).toThrowError(/Requires a MangaHandle/);
            expect(() => repository.getChapter({})).toThrowError(/Requires a ChapterHandle/);
            expect(() => repository.getPage({})).toThrowError(/Requires a PageHandle/);
        });

        describe('Manga, Chapters and Pages', () => {
            let mangaHandles;
            beforeEach((done) => {
                expect(mangaHandles).toBeUndefined();
                return repository.search()
                    .then((results) => {
                        mangaHandles = results;
                    })
                    .catch(fail)
                    .then(done);
            });

            it('should implement manga, chapters and pages', (done) => {
                const testMangaHandle = mangaHandles[0];

                repository.getManga(testMangaHandle)
                    .then((manga) => {
                        expect(manga).toBeInstanceOf(Manga);
                        expect(manga.getMangaHandle()).toBeInstanceOf(MangaHandle);

                        expect(Array.isArray(manga.getChapters())).toBe(true);
                        expect(manga.getChapters()
                            .every(ch => ch instanceof ChapterHandle)).toBe(true);
                        expect(manga.getChapter(0)).toBe(manga.getChapters()[0]);

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
    });
}

RepositoryListFactory
    .create()
    .getAll()
    .forEach((repository) => {
        testRepository(repository);
    });

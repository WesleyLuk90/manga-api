const RepositoryListFactory = require('../repositories/RepositoryListFactory');
const MangaHandle = require('../sdk/MangaHandle');
const Manga = require('../sdk/Manga');
const Chapter = require('../sdk/Chapter');
const ChapterHandle = require('../sdk/ChapterHandle');
const Page = require('../sdk/Page');
const PageHandle = require('../sdk/PageHandle');
const path = require('path');
const Rx = require('rx');

function testRepository(repository) {
    describe(repository.getName(), () => {
        const cap = repository.getCapabilities();
        let data;
        beforeEach(() => {
            if (!data) {
                const testDataPath = path.join(__dirname, `repository-data/${repository.getName()}.data.js`);
                try {
                    /* eslint-disable */
                    data = require(testDataPath);
                    /* eslint-enable */
                } catch (e) {
                    console.warn(`No test data found for ${repository.getName()} at ${testDataPath}`);
                }
            }
        });
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
            expect(() => repository.search({})).toThrowError(/Requires filters/);
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
        describe('with data', () => {
            function assertDataMatches(actual, expected, exclude) {
                Object.keys(expected)
                    .filter(c => !exclude || exclude.indexOf(c) === -1)
                    .forEach((resultKey) => {
                        expect(actual[resultKey])
                            .toEqual(expected[resultKey]);
                    });
            }

            function assertHandlesArray(actual, expected) {
                expect(Array.isArray(actual));
                expect(actual.map(c => c.getUrl()))
                    .toEqual(expected);
            }

            it('should get manga data', (done) => {
                if (!data || !data.manga_tests) {
                    console.warn(`No Data for manga tests for ${repository.getName()}`);
                    done();
                    return;
                }
                Rx.Observable.from(data.manga_tests)
                    .flatMapWithMaxConcurrent(1, mangaTest => Rx.Observable.defer(() => {
                        const mangaHandle = MangaHandle.unserialize(mangaTest.handle);
                        return repository.getManga(mangaHandle)
                            .then((manga) => {
                                assertDataMatches(manga, mangaTest.results, ['chapters']);
                                assertHandlesArray(manga.chapters, mangaTest.results.chapters);
                            })
                            .then(null, (e) => {
                                console.log('got an error', e);
                                throw e;
                            });
                    }))
                    .finally(done)
                    .subscribe(() => {}, fail);
            });
            it('should get chapter data', (done) => {
                if (!data || !data.chapter_tests) {
                    console.warn(`No Data for chapter tests for ${repository.getName()}`);
                    done();
                    return;
                }
                Rx.Observable.from(data.chapter_tests)
                    .flatMapWithMaxConcurrent(1, chapterTest => Rx.Observable.defer(() => {
                        const chapterHandle = ChapterHandle.unserialize(chapterTest.handle);
                        return repository.getChapter(chapterHandle)
                            .then((chapter) => {
                                assertDataMatches(chapter, chapterTest.results, ['pages']);
                                assertHandlesArray(chapter.pages, chapterTest.results.pages);
                            })
                            .then(null, (e) => {
                                console.log('got an error', e);
                                throw e;
                            });
                    }))
                    .finally(done)
                    .subscribe(() => {}, fail);
            });
            it('should get page data', (done) => {
                if (!data || !data.page_tests) {
                    console.warn(`No Data for page tests for ${repository.getName()}`);
                    done();
                    return;
                }
                Rx.Observable.from(data.page_tests)
                    .flatMapWithMaxConcurrent(1, pageData => Rx.Observable.defer(() => {
                        const pageHandle = PageHandle.unserialize(pageData.handle);
                        return repository.getPage(pageHandle)
                            .then((page) => {
                                assertDataMatches(page, pageData.results);
                            })
                            .then(null, (e) => {
                                console.log('got an error', e);
                                throw e;
                            });
                    }))
                    .finally(done)
                    .subscribe(() => {}, fail);
            });
        });
    });
}

function createTests() {
    const index = process.argv.indexOf('--repository');
    if (index > -1) {
        const name = process.argv[index + 1];
        const repo = RepositoryListFactory
            .create()
            .get(name);
        if (!repo) {
            console.error(`Repository ${name} does not exist`);
            return;
        }
        testRepository(repo);
    } else {
        const list = RepositoryListFactory
            .create();
        list.getAll()
            .forEach((repository) => {
                testRepository(repository);
            });
        testRepository(list.get('MockRepository'));
    }
}
try {
    createTests();
} catch (e) {
    console.error(e.stack);
}

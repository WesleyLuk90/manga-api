const assert = require('assert');
const ChapterHandle = require('../../../sdk/ChapterHandle');
const MangaHandle = require('../../../sdk/MangaHandle');
const MangaEntry = require('../../../sdk/MangaEntry');
const MangaVisitor = require('../../../sdk/MangaVisitor');
const Assertions = require('../Assertions');
const AbstractListLatestOperation = require('../../../sdk/operations/AbstractListLatestOperation');

module.exports = function setupListLatestTest(repository, data) {
    if (!Assertions.assertOperationFixture(repository, AbstractListLatestOperation, data, 'list_latest_tests')) {
        return;
    }

    function sometimesPromise(value, index) {
        if (index % 2 === 0) {
            return value;
        }
        return Promise.resolve(value);
    }

    function validateMangaEntry(mangaEntry, testCase) {
        expect(mangaEntry).toEqual(jasmine.any(MangaEntry));
        expect(mangaEntry.getMangaHandle()).toEqual(jasmine.any(MangaHandle));
        if (testCase.hasChapters ||
            (testCase.optionalChapters && mangaEntry.getChapterHandle() != null)) {
            expect(mangaEntry.getChapterHandle()).toEqual(jasmine.any(ChapterHandle));
        } else {
            expect(mangaEntry.getChapterHandle()).toBe(null);
        }
    }

    function checkNoDuplicates(mangaEntries) {
        mangaEntries.forEach((a, i) => {
            mangaEntries.forEach((b, j) => {
                if (i !== j) {
                    assert.notEqual(a, b);
                }
            });
        });
    }

    describe('list latest', () => {
        data.list_latest_tests.forEach((testCase) => {
            it('should list latest', () => {
                const visitor = repository.listLatest();
                expect(visitor).toEqual(jasmine.any(MangaVisitor));

                let validAsync = false;
                let remaining = testCase.iterationCount;
                const list = [];
                const promise = visitor.visit((mangaEntry) => {
                    list.push(mangaEntry);
                    validateMangaEntry(mangaEntry, testCase);
                    validAsync = true;
                    remaining--;
                    return sometimesPromise(remaining > 0, remaining);
                });
                expect(validAsync).toBe(false);
                return promise
                    .then(() => {
                        expect(remaining).toBe(0);
                        checkNoDuplicates(list);
                    });
            });
        });

        it('should propagate a thrown error', () => {
            const error = new Error('some error');
            return repository.listLatest()
                .visit(() => {
                    throw error;
                })
                .then(() => fail('Expected error'), (e) => {
                    expect(e).toBe(error);
                });
        });

        it('should propagate a rejected error', () => {
            const error = new Error('some error');
            return repository.listLatest()
                .visit(() => Promise.reject(error))
                .then(() => fail('Expected error'), (e) => {
                    expect(e).toBe(error);
                });
        });
    });
};

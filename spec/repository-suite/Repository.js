const AbstractGetPageOperation = require('../../sdk/AbstractGetPageOperation');
const AbstractGetChapterOperation = require('../../sdk/AbstractGetChapterOperation');
const AbstractSearchOperation = require('../../sdk/AbstractSearchOperation');
const AbstractGetMangaOperation = require('../../sdk/AbstractGetMangaOperation');

module.exports = function setupRepositoryTest(repository) {
    it('should get name', () => {
        expect(typeof repository.getName()).toBe('string');
    });

    it('should throw errors for invalid parameters', () => {
        if (repository.getOperation(AbstractGetMangaOperation)) {
            expect(() => repository.getManga({})).toThrowError(/Requires a MangaHandle/);
        }
        if (repository.getOperation(AbstractGetChapterOperation)) {
            expect(() => repository.getChapter({})).toThrowError(/Requires a ChapterHandle/);
        }
        if (repository.getOperation(AbstractGetPageOperation)) {
            expect(() => repository.getPage({})).toThrowError(/Requires a PageHandle/);
        }
        if (repository.getOperation(AbstractSearchOperation)) {
            expect(() => repository.search({})).toThrowError(/Requires filter/);
        }
    });
};

module.exports = function setupRepositoryTest(repository) {
    it('should get name', () => {
        expect(typeof repository.getName()).toBe('string');
    });

    it('should throw errors for invalid paramters', () => {
        expect(() => repository.getManga({})).toThrowError(/Requires a MangaHandle/);
        expect(() => repository.getChapter({})).toThrowError(/Requires a ChapterHandle/);
        expect(() => repository.getPage({})).toThrowError(/Requires a PageHandle/);
        expect(() => repository.search({})).toThrowError(/Requires filter/);
    });
};

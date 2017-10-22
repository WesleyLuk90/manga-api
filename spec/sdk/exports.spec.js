const MangaApi = require('../../index');

describe('manga-api', () => {
    it('should expose exports', () => {
        const exportList = Object.keys(MangaApi);
        expect(exportList).toContain('RepositoryListFactory');
        expect(exportList).toContain('Manga');
        expect(exportList).toContain('MangaHandle');
        expect(exportList).toContain('Chapter');
        expect(exportList).toContain('ChapterHandle');
        expect(exportList).toContain('Page');
        expect(exportList).toContain('PageHandle');
        expect(exportList).toContain('Fields');
        expect(exportList).toContain('Filters');

        const testingExportList = Object.keys(MangaApi.Testing);
        expect(testingExportList).toContain('FixtureLoader');
        expect(testingExportList).toContain('TestFactory');

        const sdkExportList = Object.keys(MangaApi.SDK);
        expect(sdkExportList).toContain('AbstractCapabilitiesOperation');
        expect(sdkExportList).toContain('AbstractGetChapterOperation');
        expect(sdkExportList).toContain('AbstractGetMangaOperation');
        expect(sdkExportList).toContain('AbstractGetPageOperation');
        expect(sdkExportList).toContain('AbstractListLatestOperation');
        expect(sdkExportList).toContain('AbstractSearchOperation');
    });
});

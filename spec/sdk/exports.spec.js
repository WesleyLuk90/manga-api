const MangaApi = require('../../index');

describe('manga-api', () => {
    it('should expose exports', () => {
        const exportList = Object.keys(MangaApi);
        expect(exportList).toContain('RepositoryListFactory');
        expect(exportList).toContain('RepositoryList');
        expect(exportList).toContain('Manga');
        expect(exportList).toContain('MangaHandle');
        expect(exportList).toContain('MangaEntry');
        expect(exportList).toContain('Chapter');
        expect(exportList).toContain('ChapterHandle');
        expect(exportList).toContain('Page');
        expect(exportList).toContain('PageHandle');
        expect(exportList).toContain('Fields');
        expect(exportList).toContain('Filters');
        expect(exportList).toContain('MangaSerializer');
    });

    it('should expose testing api', () => {
        const testingExportList = Object.keys(MangaApi.Testing);
        expect(testingExportList).toContain('FixtureLoader');
        expect(testingExportList).toContain('TestFactory');
    });

    it('should expose sdk api', () => {
        const sdkExportList = Object.keys(MangaApi.SDK);
        expect(sdkExportList).toContain('AbstractCapabilitiesOperation');
        expect(sdkExportList).toContain('AbstractGetChapterOperation');
        expect(sdkExportList).toContain('AbstractGetMangaOperation');
        expect(sdkExportList).toContain('AbstractGetPageOperation');
        expect(sdkExportList).toContain('AbstractListLatestOperation');
        expect(sdkExportList).toContain('AbstractSearchOperation');
        expect(sdkExportList).toContain('CreateHttpClientOperation');
        expect(sdkExportList).toContain('MangaRepository');
        expect(sdkExportList).toContain('MangaVisitor');
        expect(sdkExportList).toContain('PagedMangaVisitor');
        expect(sdkExportList).toContain('HttpClient');
    });

    it('should expose toolkit api', () => {
        const toolkitExportList = Object.keys(MangaApi.Toolkit);
        expect(toolkitExportList).toContain('HtmlToolkit');
        expect(toolkitExportList).toContain('TextParser');
        expect(toolkitExportList).toContain('Request');
        expect(toolkitExportList).toContain('UrlNormalizer');
    });
});

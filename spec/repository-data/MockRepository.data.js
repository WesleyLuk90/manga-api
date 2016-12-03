module.exports = {
    manga_tests: [{
        handle: 'mock://manga',
        results: {
            name: null,
            altNames: null,
            releaseYear: null,
            authors: null,
            artists: null,
            genres: null,
            summary: null,
            status: null,
            chapters: [
                'mock://chapter',
            ],
        },
    }],
    chapter_tests: [{
        handle: 'mock://chapter',
        results: {
            chapter: '',
            volume: '',
            title: '',
            pages: [
                'mock://page',
            ],
        },
    }],
    page_tests: [{
        handle: 'mock://page',
        results: {
            imageUrl: 'mock://image',
        },
    }],
    capabilities: {
        searchableFields: null,
        tagOptions: null,
        urlMangaHandles: true,
        urlChapterHandles: true,
        urlPageHandles: true,
        filterByIncludingTags: false,
        filterByExcludingTags: false,
    },
};

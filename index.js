const AbstractSearchOperation = require('./sdk/operations/AbstractSearchOperation');
const AbstractListLatestOperation = require('./sdk/operations/AbstractListLatestOperation');
const AbstractGetPageOperation = require('./sdk/operations/AbstractGetPageOperation');
const AbstractGetMangaOperation = require('./sdk/operations/AbstractGetMangaOperation');
const AbstractGetChapterOperation = require('./sdk/operations/AbstractGetChapterOperation');
const AbstractCapabilitiesOperation = require('./sdk/operations/AbstractCapabilitiesOperation');
const TestFactory = require('./spec/suite/TestFactory');
const FixtureLoader = require('./spec/suite/FixtureLoader');
const RepositoryListFactory = require('./repositories/RepositoryListFactory');
const MangaHandle = require('./sdk/MangaHandle');
const Manga = require('./sdk/Manga');
const Chapter = require('./sdk/Chapter');
const ChapterHandle = require('./sdk/ChapterHandle');
const Page = require('./sdk/Page');
const PageHandle = require('./sdk/PageHandle');
const Fields = require('./sdk/Fields');
const Filters = require('./sdk/Filters');

module.exports = {
    RepositoryListFactory,
    Manga,
    MangaHandle,
    Chapter,
    ChapterHandle,
    Page,
    PageHandle,
    Fields,
    Filters,
    SDK: {
        AbstractCapabilitiesOperation,
        AbstractGetChapterOperation,
        AbstractGetMangaOperation,
        AbstractGetPageOperation,
        AbstractListLatestOperation,
        AbstractSearchOperation,
    },
    Testing: {
        FixtureLoader,
        TestFactory,
    },
};

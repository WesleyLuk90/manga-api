const RepositoryListFactory = require('./repositories/RepositoryListFactory');
const MangaHandle = require('./sdk/MangaHandle');
const Manga = require('./sdk/Manga');
const Chapter = require('./sdk/Chapter');
const ChapterHandle = require('./sdk/ChapterHandle');
const Page = require('./sdk/Page');
const PageHandle = require('./sdk/PageHandle');

module.exports = {
    RepositoryListFactory,
    Manga,
    MangaHandle,
    Chapter,
    ChapterHandle,
    Page,
    PageHandle,
};
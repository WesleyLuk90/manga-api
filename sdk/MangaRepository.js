const MangaHandle = require('./MangaHandle');
const ChapterHandle = require('./ChapterHandle');
const PageHandle = require('./PageHandle');
const Filters = require('./Filters');
const assert = require('assert');
const AbstractSearchOperation = require('./AbstractSearchOperation');
const SearchOptions = require('./SearchOptions');
const AbstractCapabilitiesOperation = require('./AbstractCapabilitiesOperation');
const AbstractGetMangaOperation = require('./AbstractGetMangaOperation');
const AbstractGetPageOperation = require('./AbstractGetPageOperation');
const AbstractGetChapterOperation = require('./AbstractGetChapterOperation');

/* eslint-disable no-unused-vars */
class MangaRepository {
    constructor() {
        this.searchOperation = null;
        this.capabilitiesOperation = null;
        this.getMangaOperation = null;
        this.getChapterOperation = null;
        this.getPageOperation = null;
    }

    setSearchOperation(searchOperation) {
        assert(searchOperation instanceof AbstractSearchOperation);
        this.searchOperation = searchOperation;
        return this;
    }

    setCapabilitiesOperation(capabilitiesOperation) {
        assert(capabilitiesOperation instanceof AbstractCapabilitiesOperation);
        this.capabilitiesOperation = capabilitiesOperation;
        return this;
    }

    setGetMangaOperation(operation) {
        assert(operation instanceof AbstractGetMangaOperation);
        this.getMangaOperation = operation;
        return this;
    }

    setGetChapterOperation(operation) {
        assert(operation instanceof AbstractGetChapterOperation);
        this.getChapterOperation = operation;
        return this;
    }

    setGetPageOperation(operation) {
        assert(operation instanceof AbstractGetPageOperation);
        this.getPageOperation = operation;
        return this;
    }

    getCapabilities() {
        assert(this.capabilitiesOperation, 'Not Implemented');
        return this.capabilitiesOperation.getCapabilities();
    }

    search(filtersOrNull, optionsOrNull) {
        assert(this.searchOperation, 'Not Implemented');
        const filters = filtersOrNull || new Filters();
        const options = optionsOrNull || new SearchOptions();
        assert(filters instanceof Filters, 'Requires filter');
        assert(options instanceof SearchOptions, 'Expected options');
        const results = this.searchOperation.search(filters, options);
        assert(results.then, 'Expected search to return a promise');
        return results;
    }

    getName() {
        return this.constructor.name;
    }

    getManga(mangaHandle) {
        assert(this.getMangaOperation, 'Not Implemented');
        assert(mangaHandle instanceof MangaHandle, 'Requires a MangaHandle');
        const manga = this.getMangaOperation.getManga(mangaHandle);
        assert(manga.then, 'Expected operation to return a promise');
        return manga;
    }

    getChapter(chapterHandle) {
        assert(this.getChapterOperation, 'Not Implemented');
        assert(chapterHandle instanceof ChapterHandle, 'Requires a ChapterHandle');
        const chapter = this.getChapterOperation.getChapter(chapterHandle);
        assert(chapter.then, 'Expected operation to return a promise');
        return chapter;
    }

    getPage(pageHandle) {
        assert(this.getPageOperation, 'Not Implemented');
        assert(pageHandle instanceof PageHandle, 'Requires a PageHandle');
        const page = this.getPageOperation.getPage(pageHandle);
        assert(page.then, 'Expected operation to return a promise');
        return page;
    }

    isForHandle(handle) {
        throw new Error('Not Implemented');
    }

    listLatest() {
        return this.search();
    }
}

module.exports = MangaRepository;

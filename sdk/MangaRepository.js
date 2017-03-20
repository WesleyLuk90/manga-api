const MangaHandle = require('./MangaHandle');
const ChapterHandle = require('./ChapterHandle');
const PageHandle = require('./PageHandle');
const Filters = require('./Filters');
const assert = require('assert');
const AbstractSearchOperation = require('./AbstractSearchOperation');
const SearchOptions = require('./SearchOptions');
const AbstractCapabilitiesOperation = require('./AbstractCapabilitiesOperation');
const AbstractGetMangaOperation = require('./AbstractGetMangaOperation');

/* eslint-disable no-unused-vars */
class MangaRepository {
    constructor() {
        this.searchOperation = null;
        this.capabilitiesOperation = null;
        this.getMangaOperation = null;
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
        throw new Error('Not Implemented');
    }

    getPage(pageHandle) {
        throw new Error('Not Implemented');
    }

    isForHandle(handle) {
        throw new Error('Not Implemented');
    }

    listLatest() {
        throw new Error('Not Implemented');
    }

    _checkMangaHandle(mangaHandle) {
        if (!(mangaHandle instanceof MangaHandle)) {
            throw new Error(`Requires a MangaHandle but got ${mangaHandle}`);
        }
    }

    _checkChapterHandle(chapterHandle) {
        if (!(chapterHandle instanceof ChapterHandle)) {
            throw new Error('Requires a ChapterHandle');
        }
    }
    _checkPageHandle(pageHandle) {
        if (!(pageHandle instanceof PageHandle)) {
            throw new Error('Requires a PageHandle');
        }
    }
}

module.exports = MangaRepository;

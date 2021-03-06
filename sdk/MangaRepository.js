const DependencyInjector = require('./DependencyInjector');
const CreateHttpClientOperation = require('./operations/CreateHttpClientOperation');
const MangaHandle = require('./MangaHandle');
const ChapterHandle = require('./ChapterHandle');
const PageHandle = require('./PageHandle');
const Filters = require('./Filters');
const assert = require('assert');
const SearchOptions = require('./SearchOptions');
const AbstractCapabilitiesOperation = require('./operations/AbstractCapabilitiesOperation');
const AbstractGetMangaOperation = require('./operations/AbstractGetMangaOperation');
const AbstractGetPageOperation = require('./operations/AbstractGetPageOperation');
const AbstractGetChapterOperation = require('./operations/AbstractGetChapterOperation');
const AbstractSearchOperation = require('./operations/AbstractSearchOperation');
const AbstractListLatestOperation = require('./operations/AbstractListLatestOperation');

const VALID_OPERATIONS = [
    AbstractCapabilitiesOperation,
    AbstractGetChapterOperation,
    AbstractGetMangaOperation,
    AbstractGetPageOperation,
    AbstractSearchOperation,
    AbstractListLatestOperation,
    CreateHttpClientOperation,
];

function isAssignableFrom(klass1, klass2) {
    return klass1.prototype instanceof klass2 || klass1 === klass2;
}

function validateOperation(operation) {
    assert.equal(typeof operation, 'function', `Expected an operation but got ${operation}`);
    const isKnown = VALID_OPERATIONS.some(o => isAssignableFrom(operation, o));
    if (!isKnown) {
        assert(isKnown, `Invalid operation ${operation.name}, must extend one of ${VALID_OPERATIONS.map(o => o.name)}`);
    }
}

/* eslint-disable no-unused-vars */
class MangaRepository {
    constructor() {
        this.operations = [];

        this.addOperation(CreateHttpClientOperation);

        this.injector = new DependencyInjector(this);
    }

    addOperation(operation) {
        validateOperation(operation);
        this.operations.unshift(operation);
    }

    getOperation(klass) {
        return this.operations.filter(o => isAssignableFrom(o, klass))[0];
    }

    get(klass) {
        const Operation = this.getOperation(klass);
        assert(Operation, `${klass.name} Not Implemented`);
        return this.injector.inject(new Operation());
    }

    getCapabilities() {
        return this.get(AbstractCapabilitiesOperation).getCapabilities();
    }

    search(filtersOrNull, optionsOrNull) {
        const operation = this.get(AbstractSearchOperation);
        const filters = filtersOrNull || new Filters();
        const options = optionsOrNull || new SearchOptions();
        assert(filters instanceof Filters, 'Requires filter');
        assert(options instanceof SearchOptions, 'Expected options');
        const results = operation.search(filters, options);
        assert(results.then, 'Expected search to return a promise');
        return results;
    }

    getName() {
        return this.constructor.name;
    }

    getManga(mangaHandle) {
        const operation = this.get(AbstractGetMangaOperation);
        assert(mangaHandle instanceof MangaHandle, 'Requires a MangaHandle');
        const manga = operation.getManga(mangaHandle);
        assert(manga.then, 'Expected operation to return a promise');
        return manga;
    }

    getChapter(chapterHandle) {
        const operation = this.get(AbstractGetChapterOperation);
        assert(chapterHandle instanceof ChapterHandle, 'Requires a ChapterHandle');
        const chapter = operation.getChapter(chapterHandle);
        assert(chapter.then, 'Expected operation to return a promise');
        return chapter;
    }

    getPage(pageHandle) {
        const operation = this.get(AbstractGetPageOperation);
        assert(pageHandle instanceof PageHandle, 'Requires a PageHandle');
        const page = operation.getPage(pageHandle);
        assert(page.then, 'Expected operation to return a promise');
        return page;
    }

    isForHandle(handle) {
        throw new Error('Not Implemented');
    }

    listLatest() {
        const operation = this.get(AbstractListLatestOperation);
        return this.injector.inject(operation.listLatest());
    }
}

module.exports = MangaRepository;

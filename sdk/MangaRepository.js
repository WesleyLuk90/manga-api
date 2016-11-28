const MangaHandle = require('./MangaHandle');
const ChapterHandle = require('./ChapterHandle');
const PageHandle = require('./PageHandle');
const Filters = require('./Filters');

/* eslint-disable no-unused-vars */
class MangaRepository {
    /**
     * @returns
     */
    getCapabilities() {
        throw new Error('Not Implemented');
    }

    search(filters, options) {
        throw new Error('Not Implemented');
    }

    getName() {
        return this.constructor.name;
    }

    getManga(mangaHandle) {
        throw new Error('Not Implemented');
    }

    getChapter(mangaHandle) {
        throw new Error('Not Implemented');
    }

    getPage(mangaHandle) {
        throw new Error('Not Implemented');
    }

    _checkMangaHandle(mangaHandle) {
        if (!(mangaHandle instanceof MangaHandle)) {
            throw new Error('Requires a MangaHandle');
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

    _checkFilters(filters) {
        if (!(filters instanceof Filters)) {
            throw new Error('Requires filters');
        }
    }
}

module.exports = MangaRepository;

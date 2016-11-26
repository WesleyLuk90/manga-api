const MangaHandle = require('./MangaHandle');

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
}

module.exports = MangaRepository;

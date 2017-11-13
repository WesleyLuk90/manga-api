const assert = require('assert');
const ChapterHandle = require('./ChapterHandle');
const MangaHandle = require('./MangaHandle');

module.exports = class MangaEntry {
    static create(mangaHandle) {
        return new MangaEntry(mangaHandle);
    }

    constructor(mangaHandle) {
        assert(mangaHandle instanceof MangaHandle);
        this.mangaHandle = mangaHandle;
        this.chapterHandle = null;
    }

    getMangaHandle() {
        return this.mangaHandle;
    }

    setChapterHandle(chapterHandle) {
        assert(chapterHandle instanceof ChapterHandle);
        this.chapterHandle = chapterHandle;
        return this;
    }

    getChapterHandle() {
        return this.chapterHandle;
    }
};

const assert = require('assert');
const lodash = require('lodash');
const ChapterHandle = require('./ChapterHandle');
const MangaHandle = require('./MangaHandle');

module.exports = class MangaEntry {
    static create(mangaHandle) {
        return new MangaEntry(mangaHandle);
    }

    static equals(a, b) {
        return lodash.isEqual(a, b);
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

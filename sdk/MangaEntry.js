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

    static deserialize(data) {
        return MangaEntry.create(MangaHandle.deserializeNullable(data.mangaHandle))
            .setChapterHandle(ChapterHandle.deserializeNullable(data.chapterHandle));
    }

    constructor(mangaHandle) {
        assert(mangaHandle instanceof MangaHandle);
        this.mangaHandle = mangaHandle;
        this.chapterHandle = null;
    }

    serialize() {
        return {
            mangaHandle: MangaHandle.serializeNullable(this.mangaHandle),
            chapterHandle: ChapterHandle.serializeNullable(this.chapterHandle),
        };
    }

    getMangaHandle() {
        return this.mangaHandle;
    }

    setChapterHandle(chapterHandle) {
        assert(chapterHandle instanceof ChapterHandle || chapterHandle === null);
        this.chapterHandle = chapterHandle;
        return this;
    }

    getChapterHandle() {
        return this.chapterHandle;
    }
};

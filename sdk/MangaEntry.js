const assert = require('assert');
const lodash = require('lodash');
const MangaHandle = require('./MangaHandle');
const ChapterHandle = require('./ChapterHandle');
const Manga = require('./Manga');

module.exports = class MangaEntry {
    static create(manga) {
        return new MangaEntry(manga);
    }

    static equals(a, b) {
        if (a == null || b == null) {
            return lodash.isEqual(a, b);
        }
        return lodash.isEqual(a.getMangaHandle(), b.getMangaHandle()) &&
            lodash.isEqual(a.getChapterHandle(), b.getChapterHandle());
    }

    static deserialize(data) {
        return MangaEntry.create(MangaHandle.deserializeNullable(data.mangaHandle))
            .setChapterHandle(ChapterHandle.deserializeNullable(data.chapterHandle));
    }

    constructor(manga) {
        assert(manga instanceof Manga);
        this.manga = manga;
        this.chapterHandle = null;
    }

    serialize() {
        return {
            mangaHandle: MangaHandle.serializeNullable(this.mangaHandle),
            chapterHandle: ChapterHandle.serializeNullable(this.chapterHandle),
        };
    }

    getManga() {
        return this.manga;
    }

    getMangaHandle() {
        return this.manga.getMangaHandle();
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

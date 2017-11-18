const Utils = require('./Utils');

class Manga {
    static serialize(manga) {
        if (!manga) {
            return null;
        }

    }

    static deserialize() {

    }

    constructor(mangaHandle) {
        if (mangaHandle == null) {
            throw new Error('A MangaHandle is required');
        }
        this.mangaHandle = mangaHandle;
        this.name = null;
        this.altNames = null;
        this.chapters = null;
        this.type = null;
        this.tags = [];
    }

    getMangaHandle() {
        return this.mangaHandle;
    }

    setChapters(chapters) {
        if (!Array.isArray(chapters)) {
            throw new Error('chapters must be an array');
        }
        this.chapters = chapters;
        return this;
    }

    getChapter(index) {
        if (this.chapters == null) {
            throw new Error('No chapters set');
        }
        if (index >= this.chapters.length || index < 0) {
            throw new Error(`Chapter index out of bounds, ${index} must be between 0 and ${this.chapters.length - 1}`);
        }
        return this.chapters[index];
    }

    getChapters() {
        if (this.chapters == null) {
            throw new Error('No chapters set');
        }
        return this.chapters.slice();
    }
}

Utils.defineStringGetterSetter(Manga, 'previewImageUrl');
Utils.defineStringGetterSetter(Manga, 'name');
Utils.defineStringGetterSetter(Manga, 'releaseYear');
Utils.defineStringGetterSetter(Manga, 'summary');
Utils.defineStringGetterSetter(Manga, 'status');
Utils.defineStringGetterSetter(Manga, 'type');
Utils.defineArrayGetterSetter(Manga, 'altNames');
Utils.defineArrayGetterSetter(Manga, 'authors');
Utils.defineArrayGetterSetter(Manga, 'artists');
Utils.defineArrayGetterSetter(Manga, 'genres');
Utils.defineArrayGetterSetter(Manga, 'tags');

module.exports = Manga;

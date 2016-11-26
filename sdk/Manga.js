class Manga {
    constructor(mangaHandle) {
        if (mangaHandle == null) {
            throw new Error('A MangaHandle is required');
        }
        this.mangaHandle = mangaHandle;
        this.name = null;
        this.altNames = null;
        this.chapters = null;
    }

    getMangaHandle() {
        return this.mangaHandle;
    }

    getName() {
        if (this.name == null) {
            throw new Error('No name set');
        }
        return this.name;
    }

    setName(name) {
        if (typeof name !== 'string') {
            throw new Error('name must be a string');
        }
        this.name = name;
        return this;
    }

    setAltNames(altNames) {
        if (!Array.isArray(altNames)) {
            throw new Error('altNames must be an array');
        }
        this.altNames = altNames;
        return this;
    }

    getAltNames() {
        if (this.altNames == null) {
            throw new Error('No alt names set');
        }
        return this.altNames.slice();
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

module.exports = Manga;

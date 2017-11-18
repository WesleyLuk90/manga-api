const ChapterHandle = require('./ChapterHandle');
const MangaHandle = require('./MangaHandle');
const Models = require('./Models');

class Manga {
    static create(mangaHandle) {
        return new Manga(mangaHandle);
    }

    constructor(mangaHandle) {
        if (mangaHandle == null) {
            throw new Error('A MangaHandle is required');
        }
        this.mangaHandle = mangaHandle;
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

Models.defineModel(Manga, {
    fields: [
        'previewImageUrl',
        'name',
        'releaseYear',
        'summary',
        'status',
        'type',
    ],
    arrayFields: [
        'altNames',
        'authors',
        'artists',
        'genres',
        'tags',
    ],
    typedFields: [
        { id: 'mangaHandle', type: MangaHandle },
    ],
    typedArrayFields: [
        { id: 'chapters', type: ChapterHandle },
    ],
});

module.exports = Manga;

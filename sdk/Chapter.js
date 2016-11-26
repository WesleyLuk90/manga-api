const ChapterHandle = require('./ChapterHandle');

class Chapter {
    constructor(chapterHandle) {
        if (!(chapterHandle instanceof ChapterHandle)) {
            throw new Error('A ChapterHandle is required');
        }
        this.chapterHandle = chapterHandle;
        this.title = '';
        this.chapter = '';
        this.volume = '';
        this.pages = null;
    }
    getChapterHandle() {
        return this.chapterHandle;
    }
    setTitle(title) {
        if (typeof title !== 'string') {
            throw new Error('Title must be a string');
        }
        this.title = title;
        return this;
    }
    getTitle() {
        return this.title;
    }
    setVolume(volume) {
        if (typeof volume !== 'string') {
            throw new Error('Volume must be a string');
        }
        this.volume = volume;
        return this;
    }
    getVolume() {
        return this.volume;
    }
    setChapter(chapter) {
        if (typeof chapter !== 'string') {
            throw new Error('Chapter must be a string');
        }
        this.chapter = chapter;
        return this;
    }
    getChapter() {
        return this.chapter;
    }
    setPages(pages) {
        if (!Array.isArray(pages)) {
            throw new Error('Pages must be an array');
        }
        this.pages = pages;
        return this;
    }
    getPage(index) {
        if (this.pages == null) {
            throw new Error('No pages set');
        }
        if (typeof index !== 'number') {
            throw new Error('Index must be a number');
        }
        if (index >= this.pages.length || index < 0) {
            throw new Error(`Page index out of bounds, index ${index} must be between 0 and ${this.pages.length - 1}`);
        }
        return this.pages[index];
    }
    getPages() {
        if (this.pages == null) {
            throw new Error('No pages set');
        }
        return this.pages;
    }
}

module.exports = Chapter;

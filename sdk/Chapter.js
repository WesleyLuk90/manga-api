const ChapterHandle = require('./ChapterHandle');
const Utils = require('./Utils');

class Chapter {
    constructor(chapterHandle) {
        if (!(chapterHandle instanceof ChapterHandle)) {
            throw new Error('A ChapterHandle is required');
        }
        this.chapterHandle = chapterHandle;
        this.chapter = '';
        this.volume = '';
        this.title = '';
        this.pages = null;
    }
    getChapterHandle() {
        return this.chapterHandle;
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

    generateDescription() {
        if (!this.title) {
            if (!this.chapter) {
                return this.chapterHandle.url;
            }
            return this.chapter;
        }
        if (!this.chapter) {
            return this.title;
        }
        return `${this.chapter} - ${this.title}`;
    }
}

Utils.defineStringGetterSetter(Chapter, 'chapter');
Utils.defineStringGetterSetter(Chapter, 'volume');
Utils.defineStringGetterSetter(Chapter, 'title');

module.exports = Chapter;

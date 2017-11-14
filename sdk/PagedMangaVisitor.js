const lodash = require('lodash');
const MangaEntry = require('./MangaEntry');
const MangaVisitor = require('./MangaVisitor');

/* eslint-disable no-unused-vars */

module.exports = class PagedMangaVisitor extends MangaVisitor {
    constructor() {
        super();
        this.page = null;
        this.nextIndex = 0;
        this.nextPageIndex = 0;
    }

    serialize() {
        return {
            page: !this.page ? this.page : this.page.map(p => p.serialize()),
            nextIndex: this.nextIndex,
            nextPageIndex: this.nextPageIndex,
        };
    }

    deserialize(data) {
        this.page = !data.page ? null : data.page.map(p => MangaEntry.deserialize(p));
        this.nextIndex = data.nextIndex;
        this.nextPageIndex = data.nextPageIndex;
        return this;
    }

    getNextPage() {
        if (!this.page || this.nextIndex >= this.page.length) {
            const last = this.page && this.page[this.page.length - 1];
            return this.getPage(this.nextPageIndex++)
                .then((page) => {
                    this.page = page;
                    this.nextIndex = this.findNextIndex(last, page);
                    return this.page;
                });
        }
        return Promise.resolve(this.page);
    }

    findNextIndex(lastViewed, newList) {
        return lodash.findIndex(newList, e => MangaEntry.equals(lastViewed, e)) + 1;
    }

    next() {
        return this.getNextPage()
            .then((page) => {
                if (!page || page.length === 0) {
                    return null;
                }
                return page[this.nextIndex++];
            });
    }

    getPage(index) {
        throw new Error('Not Implemented');
    }
};

const MangaVisitor = require('./MangaVisitor');

/* eslint-disable no-unused-vars */

module.exports = class PagedMangaVisitor extends MangaVisitor {
    constructor() {
        super();
        this.page = null;
        this.nextIndex = 0;
        this.nextPageIndex = 0;
    }

    getNextPage() {
        if (!this.page || this.nextIndex >= this.page.length) {
            this.nextIndex = 0;
            return this.getPage(this.nextPageIndex++)
                .then((page) => {
                    this.page = page;
                    return this.page;
                });
        }
        return Promise.resolve(this.page);
    }

    next() {
        return this.getNextPage()
            .then((page) => {
                if (!page || page.length === 0) {
                    return null;
                }
                return page[this.nextIndex];
            });
    }

    getPage(index) {
        throw new Error('Not Implemented');
    }
};

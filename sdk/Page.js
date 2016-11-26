const PageHandle = require('./PageHandle');

class Page {
    constructor(pageHandle) {
        if (!(pageHandle instanceof PageHandle)) {
            throw new Error('Requires a PageHandle');
        }
        this.pageHandle = pageHandle;
        this.imageUrl = null;
    }

    getPageHandle() {
        return this.pageHandle;
    }
    setImageUrl(imageUrl) {
        if (typeof imageUrl !== 'string') {
            throw new Error('Image url must be a string');
        }
        this.imageUrl = imageUrl;
        return this;
    }
    getImageUrl() {
        if (this.imageUrl == null) {
            throw new Error('Image url has not been set');
        }
        return this.imageUrl;
    }
}

module.exports = Page;

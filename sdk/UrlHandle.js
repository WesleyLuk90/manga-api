class UrlHandle {
    static fromUrl(url) {
        if (url == null) {
            throw new Error('Url must be provided');
        }
        return new this().setUrl(url);
    }
    constructor() {
        this.url = null;
    }

    setUrl(url) {
        if (typeof(url) !== 'string') {
            throw new Error('Url must be a string');
        }
        this.url = url;
        return this;
    }

    getUrl() {
        if (this.url == null) {
            throw new Error('No url set');
        }
        return this.url;
    }
}
module.exports = UrlHandle;

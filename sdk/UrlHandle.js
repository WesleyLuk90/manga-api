class UrlHandle {
    static fromUrl(url) {
        if (url == null) {
            throw new Error('Url must be provided');
        }
        return new this().setUrl(url);
    }

    static deserialize(data) {
        return this.fromUrl(data);
    }

    static serializeNullable(handle) {
        if (!handle) {
            return null;
        }
        return handle.serialize();
    }

    static deserializeNullable(data) {
        if (!data) {
            return null;
        }
        return this.deserialize(data);
    }

    static equals(a, b) {
        if (a === b) {
            return true;
        }
        return a.url === b.url;
    }

    constructor() {
        this.url = null;
    }

    setUrl(url) {
        if (typeof url !== 'string') {
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

    serialize() {
        return this.getUrl();
    }
}
module.exports = UrlHandle;

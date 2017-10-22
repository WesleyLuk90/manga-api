const assert = require('assert');
const lodash = require('lodash');
const cheerio = require('cheerio');

module.exports = class UrlNormalizer {
    static create(url) {
        return new UrlNormalizer(url);
    }

    static fromAnchor(anchor) {
        assert(anchor instanceof cheerio, `Expected an instance of cheerio but got ${anchor}`);
        return this.create(anchor.attr('href'));
    }

    constructor(url) {
        assert.equal(typeof url, 'string');
        this.url = url.trim();

        this.ensureScheme();
    }

    ensureScheme() {
        if (lodash.startsWith(this.url, '//')) {
            this.url = `http:${this.url}`;
        }
        return this;
    }

    ensureSuffix(suffix) {
        if (!lodash.endsWith(this.url, suffix)) {
            this.url = `${this.url}${suffix}`;
        }
        return this;
    }

    get() {
        return this.url;
    }
};

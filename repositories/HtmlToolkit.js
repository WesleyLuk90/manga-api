const $ = require('cheerio');
const assert = require('assert');
const url = require('url');
const Request = require('./Request');

module.exports = class HtmlToolkit {
    static text(e) {
        return (e.text ? e : $.load(e)).text().trim();
    }

    static textArray(es) {
        return Array.from(es).map(HtmlToolkit.text);
    }

    static getDocument(pageUrl) {
        assert(typeof pageUrl === 'string');
        return Request.get(pageUrl)
            .then(res => res.document);
    }

    static appendQueryString(inputUrl, queryString) {
        const urlObject = url.parse(inputUrl, true);
        delete urlObject.search;
        Object.assign(urlObject.query, queryString);
        return url.format(urlObject);
    }
};

const $ = require('cheerio');
const assert = require('assert');
const superagent = require('superagent');
const url = require('url');

class HtmlToolkit {
    static text(e) {
        return $(e).text().trim();
    }

    static textArray(es) {
        return Array.from(es).map(HtmlToolkit.text);
    }

    static getDocument(pageUrl) {
        assert(typeof pageUrl === 'string');
        return superagent.get(pageUrl)
            .then(res => res.document);
    }

    static appendQueryString(inputUrl, queryString) {
        const urlObject = url.parse(inputUrl, true);
        delete urlObject.search;
        Object.assign(urlObject.query, queryString);
        return url.format(urlObject);
    }
}

module.exports = HtmlToolkit;

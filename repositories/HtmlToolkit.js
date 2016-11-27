const $ = require('cheerio');

class HtmlToolkit {
    static text(e) {
        return $(e).text().trim();
    }

    static textArray(es) {
        return Array.from(es).map(HtmlToolkit.text);
    }
}

module.exports = HtmlToolkit;

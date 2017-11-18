const assert = require('assert');
const HtmlToolkit = require('./HtmlToolkit');

/**
 * Provides a way to parse the text of elements
 * @exports repositories/TextParser
 */
module.exports = class TextParser {

    /**
     * Utility method to create a TextParser from a cheerio elemtn
     * @param {cheerio} ele The element to get the text content from
     */
    static create(ele) {
        return new TextParser(HtmlToolkit.text(ele));
    }

    static fromText(text) {
        return new TextParser(text);
    }

    /**
     * Creates a new text parser
     * @param {String} text The base text
     */
    constructor(text) {
        assert.equal(typeof text, 'string');
        this.text = text.trim();
    }

    trimPrefix(prefix) {
        return new TextParser(this.text.replace(prefix, ''));
    }

    split(...delimiter) {
        let list = [this.text];
        delimiter.forEach((d) => {
            list = [].concat(...list.map(i => i.split(d)));
        });
        return list
            .map(s => TextParser.fromText(s).get())
            .filter(s => s !== '');
    }

    extract(regex) {
        assert(regex instanceof RegExp);

        const match = this.text.match(regex);
        if (!match) {
            return TextParser.fromText('');
        }
        return TextParser.fromText(match[1]);
    }

    get() {
        return this.text;
    }
};

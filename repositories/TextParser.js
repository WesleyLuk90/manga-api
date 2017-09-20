const assert = require('assert');
const HtmlToolkit = require('./HtmlToolkit');

module.exports = class TextParser {
    static create(ele) {
        return new TextParser(HtmlToolkit.text(ele));
    }

    static fromText(text) {
        return new TextParser(text);
    }

    constructor(text) {
        assert.equal(typeof text, 'string');
        this.text = text.trim();
    }

    trimPrefix(prefix) {
        return new TextParser(this.text.replace(prefix, ''));
    }

    split(delimiter) {
        return this.text.split(delimiter)
            .map(s => TextParser.fromText(s).get())
            .filter(s => s !== '');
    }

    get() {
        return this.text;
    }
};

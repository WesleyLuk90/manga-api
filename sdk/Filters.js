const Field = require('./Field');

class Filters {
    constructor() {
        this.includedTags = [];
        this.excludedTags = [];
        this.searchedFields = new Map();
    }

    getIncludedTags() {
        return this.includedTags.slice();
    }

    setIncludedTags(tags) {
        if (!Array.isArray(tags)) {
            throw new Error('Tags must be an array');
        }
        this.includedTags = tags;
        return this;
    }

    getExcludedTags() {
        return this.excludedTags.slice();
    }

    setExcludedTags(tags) {
        if (!Array.isArray(tags)) {
            throw new Error('Tags must be an array');
        }
        this.excludedTags = tags;
        return this;
    }

    hasIncludedTag(tag) {
        return this.includedTags.indexOf(tag) > -1;
    }

    hasExcludedTag(tag) {
        return this.excludedTags.indexOf(tag) > -1;
    }

    _checkField(field) {
        if (!(field instanceof Field)) {
            throw new Error('Expected field to be an instance of Field');
        }
    }

    getSearchField(field) {
        this._checkField(field);
        return this.searchedFields.get(field) || '';
    }

    setSearchField(field, term) {
        this._checkField(field);

        this.searchedFields.set(field, term);
        return this;
    }
}

module.exports = Filters;

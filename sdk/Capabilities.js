const _ = require('lodash');
const Fields = require('./Fields');

class Capabilities {
    constructor() {
        this.tagOptions = null;
        this.searchableFields = null;
    }

    supportsTagFiltering() {
        return this.tagOptions != null &&
            (this.supportsFilterByIncludingTags() || this.supportsFilterByExcludingTags());
    }

    setTagOptions(options) {
        if (!Array.isArray(options)) {
            throw new Error('Options must be an array');
        }
        this.tagOptions = options;
        return this;
    }

    getTagOptions() {
        if (this.tagOptions == null) {
            throw new Error('Tag options not supported');
        }
        return this.tagOptions;
    }

    supportsSearchingFields() {
        return this.searchableFields != null;
    }

    getSearchableFields() {
        if (!this.supportsSearchingFields()) {
            throw new Error('Searching fields not supported');
        }
        return this.searchableFields.slice();
    }

    setSearchableFields(fields) {
        if (!Array.isArray(fields)) {
            throw new Error('Searchable fields must be an array');
        }
        fields.forEach((field) => {
            if (!Fields.validField(field)) {
                throw new Error(`${field} is an invalid field`);
            }
        });
        this.searchableFields = fields;
        return this;
    }
}

const booleanCapabilities = {
    urlMangaHandles: true,
    urlChapterHandles: true,
    urlPageHandles: true,
    filterByIncludingTags: false,
    filterByExcludingTags: false,
};

Object.keys(booleanCapabilities).forEach((cap) => {
    const supportsName = _.camelCase(`supports_${cap}`);
    const setterName = _.camelCase(`set_${cap}`);
    const defaultValue = booleanCapabilities[cap];

    Capabilities.prototype[cap] = defaultValue;
    Capabilities.prototype[supportsName] = function getter() {
        return this[cap];
    };
    Capabilities.prototype[setterName] = function setter(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error(`Value for ${cap} must be a boolean not ${newValue}`);
        }
        this[cap] = newValue;
        return this;
    };
});

module.exports = Capabilities;

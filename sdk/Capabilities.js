const _ = require('lodash');

class Capabilities {}

const booleanCapabilities = {
    urlMangaHandles: true,
    urlChapterHandles: true,
    urlPageHandles: true,
};

Object.keys(booleanCapabilities).forEach((cap) => {
    const getterName = _.camelCase(`get_${cap}`);
    const supportsName = _.camelCase(`supports_${cap}`);
    const setterName = _.camelCase(`set_${cap}`);
    const defaultValue = booleanCapabilities[cap];

    Capabilities.prototype[cap] = defaultValue;
    Capabilities.prototype[getterName] = function getter() {
        return this[cap];
    };
    Capabilities.prototype[supportsName] = Capabilities.prototype[getterName];
    Capabilities.prototype[setterName] = function setter(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error(`Value for ${cap} must be a boolean not ${newValue}`);
        }
        this[cap] = newValue;
        return this;
    };
});

module.exports = Capabilities;

const _ = require('lodash');

class Utils {
    static _checkOverwrite(klass, property) {
        if (klass.prototype[property]) {
            console.warn(`Property ${property} is already defined on ${klass.name}, not overwriting`);
            return false;
        }
        return true;
    }

    static defineStringGetterSetter(klass, property) {
        const getterName = _.camelCase(`get_${property}`);
        const setterName = _.camelCase(`set_${property}`);

        if (Utils._checkOverwrite(klass, getterName)) {
            klass.prototype[getterName] = function getter() {
                return this[property];
            };
        }
        if (Utils._checkOverwrite(klass, setterName)) {
            klass.prototype[setterName] = function setter(newValue) {
                if (typeof newValue !== 'string') {
                    throw new Error('Expected a string');
                }
                this[property] = newValue;
                return this;
            };
        }
        if (Utils._checkOverwrite(klass, property)) {
            klass.prototype[property] = null;
        }
    }
    static defineArrayGetterSetter(klass, property) {
        const getterName = _.camelCase(`get_${property}`);
        const setterName = _.camelCase(`set_${property}`);

        if (Utils._checkOverwrite(klass, getterName)) {
            klass.prototype[getterName] = function getter() {
                return this[property];
            };
        }
        if (Utils._checkOverwrite(klass, setterName)) {
            klass.prototype[setterName] = function setter(newValue) {
                if (!Array.isArray(newValue)) {
                    throw new Error('Expected an array');
                }
                this[property] = newValue;
                return this;
            };
        }
        if (Utils._checkOverwrite(klass, property)) {
            klass.prototype[property] = null;
        }
    }
}

module.exports = Utils;

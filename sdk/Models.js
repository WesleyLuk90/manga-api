const assert = require('assert');
const lodash = require('lodash');

module.exports = class Models {
    static defineModel(Klass, fields) {
        assert.equal(typeof Klass, 'function');
        assert(Array.isArray(fields));
        fields.forEach((f) => {
            assert.equal(typeof f, 'string');
            assert.equal(lodash.camelCase(f), f);
        });

        fields.forEach((f) => {
            this.defineDefaultValue(Klass, f);
            this.defineGetter(Klass, f);
            this.defineSetter(Klass, f);
        });

        Klass.create = () => new Klass();
        Klass.getDefinedFields = () => fields.slice();

        const Builder = class {};
        Klass.builder = () => new Builder();
        fields.forEach((f) => {
            this.defineDefaultValue(Builder, f);
            this.defineGetter(Builder, f);
            this.defineNullableSetter(Builder, f);
        });
        Builder.prototype.create = function create() {
            const instance = new Klass();
            fields.forEach((f) => {
                if (this[f] != null) {
                    instance[f] = this[f];
                }
            });
            return instance;
        };
    }

    static defineDefaultValue(klass, key) {
        klass.prototype[key] = null;
    }

    static defineGetter(klass, key) {
        const getter = `get${lodash.upperFirst(key)}`;
        klass.prototype[getter] = function _getter() {
            return this[key];
        };
    }

    static defineSetter(klass, key) {
        const setter = `set${lodash.upperFirst(key)}`;
        klass.prototype[setter] = function _setter(value) {
            assert.notEqual(value, null, `Expected a value but got '${value}'`);
            this[key] = value;
            return this;
        };
    }

    static defineNullableSetter(klass, key) {
        const setter = `set${lodash.upperFirst(key)}`;
        klass.prototype[setter] = function _setter(value) {
            this[key] = value;
            return this;
        };
    }
};

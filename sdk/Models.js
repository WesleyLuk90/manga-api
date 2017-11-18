const assert = require('assert');
const lodash = require('lodash');

class Fields {
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
}

class ArrayFields {
    static defineDefaultValue(klass, key) {
        klass.prototype[key] = [];
    }

    static defineGetter(klass, key) {
        const getter = `get${lodash.upperFirst(key)}`;
        klass.prototype[getter] = function _getter() {
            return this[key].slice();
        };
    }

    static defineSetter(klass, key) {
        const setter = `set${lodash.upperFirst(key)}`;
        klass.prototype[setter] = function _setter(value) {
            assert(Array.isArray(value), `Expected an array but got '${value}'`);
            this[key] = value.slice();
            return this;
        };
    }

    static defineNullableSetter(klass, key) {
        const setter = `set${lodash.upperFirst(key)}`;
        klass.prototype[setter] = function _setter(value) {
            assert(Array.isArray(value) || value == null, `Expected an array but got '${value}'`);
            if (!value) {
                this[key] = [];
            } else {
                this[key] = value;
            }
            return this;
        };
    }
}

module.exports = class Models {
    static defineModel(Klass, { fields, arrayFields }) {
        assert.equal(typeof Klass, 'function');
        assert(Array.isArray(fields));
        fields.forEach((f) => {
            assert.equal(typeof f, 'string');
            assert.equal(lodash.camelCase(f), f);
        });

        fields.forEach((f) => {
            Fields.defineDefaultValue(Klass, f);
            Fields.defineGetter(Klass, f);
            Fields.defineSetter(Klass, f);
        });
        arrayFields.forEach((f) => {
            ArrayFields.defineDefaultValue(Klass, f);
            ArrayFields.defineGetter(Klass, f);
            ArrayFields.defineSetter(Klass, f);
        });

        Klass.create = () => new Klass();
        Klass.getDefinedFields = () => [...fields, ...arrayFields];

        const Builder = class {};
        Klass.builder = () => new Builder();
        fields.forEach((f) => {
            Fields.defineDefaultValue(Builder, f);
            Fields.defineGetter(Builder, f);
            Fields.defineNullableSetter(Builder, f);
        });
        arrayFields.forEach((f) => {
            ArrayFields.defineDefaultValue(Builder, f);
            ArrayFields.defineGetter(Builder, f);
            ArrayFields.defineNullableSetter(Builder, f);
        });
        Builder.prototype.create = function create() {
            const instance = new Klass();
            fields.forEach((f) => {
                if (this[f] != null) {
                    instance[f] = this[f];
                }
            });
            arrayFields.forEach((f) => {
                instance[f] = this[f].slice();
            });
            return instance;
        };
    }
};

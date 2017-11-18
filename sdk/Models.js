const assert = require('assert');
const lodash = require('lodash');
const Model = require('./Model');

class FieldList {
    constructor({ fields, arrayFields, typedFields, typedArrayFields }) {
        Object.assign(this, { fields, arrayFields, typedFields, typedArrayFields });
    }

    getAllFields() {
        return []
            .concat(this.fields,
                this.arrayFields,
                this.typedFields.map(f => f.id),
                this.typedArrayFields.map(f => f.id));
    }
}

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

    static defineSetter(klass, key, type) {
        const setter = `set${lodash.upperFirst(key)}`;
        klass.prototype[setter] = function _setter(value) {
            if (typeof type === 'string') {
                assert.equal(typeof value, type, `Expected a ${type} but got '${value}'`);
            } else {
                assert(value instanceof type, `Expected a ${type} but got '${value}'`);
            }
            this[key] = value;
            return this;
        };
    }

    static defineNullableSetter(klass, key, type) {
        const setter = `set${lodash.upperFirst(key)}`;
        klass.prototype[setter] = function _setter(value) {
            if (value != null) {
                if (typeof type === 'string') {
                    assert.equal(typeof value, type, `Expected a ${type} but got '${value}'`);
                } else {
                    assert(value instanceof type, `Expected a ${type} but got '${value}'`);
                }
            }
            if (value != null) {
                this[key] = value;
            }
            return this;
        };
    }
}

class ArrayFields {
    static defineDefaultValue(klass, key) {
        klass.prototype[key] = null;
    }

    static defineGetter(klass, key) {
        const getter = `get${lodash.upperFirst(key)}`;
        klass.prototype[getter] = function _getter() {
            return this[key] && this[key].slice();
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
            if (value != null) {
                this[key] = value;
            }
            return this;
        };
    }
}

module.exports = class Models {
    static defineModel(Klass, {
        fields = [],
        arrayFields = [],
        typedFields = [],
        typedArrayFields = [],
    }) {
        assert.equal(typeof Klass, 'function');
        assert(Array.isArray(fields));
        fields.forEach((f) => {
            assert.equal(typeof f, 'string');
            assert.equal(lodash.camelCase(f), f);
        });
        const fieldList = new FieldList({ fields, arrayFields, typedFields, typedArrayFields });

        const Builder = this.createBuilder(Klass, fieldList);

        const BaseClass = class extends Model {
            static create() {
                return new Klass();
            }
            static builder() {
                return new Builder();
            }
        };

        fieldList.fields.forEach((f) => {
            Fields.defineDefaultValue(BaseClass, f);
            Fields.defineGetter(BaseClass, f);
            Fields.defineSetter(BaseClass, f, 'string');
        });
        fieldList.typedFields.forEach((f) => {
            Fields.defineDefaultValue(BaseClass, f.id);
            Fields.defineGetter(BaseClass, f.id);
            Fields.defineSetter(BaseClass, f.id, f.type);
        });
        fieldList.arrayFields.forEach((f) => {
            ArrayFields.defineDefaultValue(BaseClass, f);
            ArrayFields.defineGetter(BaseClass, f);
            ArrayFields.defineSetter(BaseClass, f);
        });
        fieldList.typedArrayFields.forEach((f) => {
            ArrayFields.defineDefaultValue(BaseClass, f.id);
            ArrayFields.defineGetter(BaseClass, f.id);
            ArrayFields.defineSetter(BaseClass, f.id);
        });

        Object.setPrototypeOf(Klass.prototype, BaseClass.prototype);
        Object.setPrototypeOf(Klass, BaseClass);
    }

    static createBuilder(Klass, fieldList) {
        const Builder = class {};
        fieldList.fields.forEach((f) => {
            Fields.defineDefaultValue(Builder, f);
            Fields.defineGetter(Builder, f);
            Fields.defineNullableSetter(Builder, f, 'string');
        });
        fieldList.typedFields.forEach((f) => {
            Fields.defineDefaultValue(Builder, f.id);
            Fields.defineGetter(Builder, f.id);
            Fields.defineNullableSetter(Builder, f.id, f.type);
        });
        fieldList.arrayFields.forEach((f) => {
            ArrayFields.defineDefaultValue(Builder, f);
            ArrayFields.defineGetter(Builder, f);
            ArrayFields.defineNullableSetter(Builder, f, 'string');
        });
        fieldList.typedArrayFields.forEach((f) => {
            ArrayFields.defineDefaultValue(Builder, f.id);
            ArrayFields.defineGetter(Builder, f.id);
            ArrayFields.defineNullableSetter(Builder, f.id);
        });
        Builder.prototype.create = function create() {
            const instance = Object.create(Klass.prototype);
            fieldList.getAllFields()
                .forEach((f) => {
                    if (this[f] != null && Object.prototype.hasOwnProperty.call(this, f)) {
                        if (Array.isArray(f)) {
                            instance[f] = this[f].slice();
                        } else {
                            instance[f] = this[f];
                        }
                    }
                });
            return instance;
        };
        return Builder;
    }
};

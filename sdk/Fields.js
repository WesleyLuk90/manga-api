const Field = require('./Field');
const _ = require('lodash');

const Fields = {
    TITLE: Field.create('Title'),
    AUTHOR: Field.create('Author'),
    ARTIST: Field.create('Artist'),

    validField(field) {
        return Object.keys(Fields)
            .some(key => Fields[key] === field);
    },

    getField(label) {
        const field = _(Fields)
            .values()
            .find(f => f.label === label);
        if (!field) {
            throw new Error(`Unknown field '${label}'`);
        }
        return field;
    },
};

module.exports = Fields;

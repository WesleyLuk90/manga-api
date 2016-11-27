const Field = require('./Field');

const Fields = {
    TITLE: Field.create('Title'),
    AUTHOR: Field.create('Author'),
    ARTIST: Field.create('Artist'),

    validField(field) {
        return Object.keys(Fields)
            .some(key => Fields[key] === field);
    },
};

module.exports = Fields;

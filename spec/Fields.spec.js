const Fields = require('../sdk/Fields');

describe('Fields', () => {
    it('should check for valid fields', () => {
        expect(Fields.validField({})).toBe(false);
        expect(Fields.validField(Fields.AUTHOR)).toBe(true);
    });

    it('should get fields', () => {
        expect(() => Fields.getField('my field')).toThrowError(/Unknown field 'my field'/);
        expect(Fields.getField('Title')).toEqual(Fields.TITLE);
    });
});

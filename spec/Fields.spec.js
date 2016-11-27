const Fields = require('../sdk/Fields');

describe('Fields', () => {
    it('should check for valid fields', () => {
        expect(Fields.validField({})).toBe(false);
        expect(Fields.validField(Fields.AUTHOR)).toBe(true);
    });
});

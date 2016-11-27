const Filters = require('../sdk/Filters');
const Fields = require('../sdk/Fields');

describe('Filters', () => {
    it('should be empty', () => {
        const filters = new Filters();

        expect(filters.getIncludedTags()).toEqual([]);
        expect(filters.getExcludedTags()).toEqual([]);
        expect(filters.getSearchField(Fields.TITLE)).toEqual('');
    });

    it('should set tags', () => {
        const filters = new Filters();
        expect(filters.setIncludedTags(['a', 'b', 'c'])).toBe(filters);
        expect(filters.setExcludedTags(['d', 'e', 'f'])).toBe(filters);
        expect(filters.getIncludedTags()).toEqual(['a', 'b', 'c']);
        expect(filters.getExcludedTags()).toEqual(['d', 'e', 'f']);
    });

    it('should set search fields', () => {
        const filters = new Filters();
        expect(filters.setSearchField(Fields.TITLE, 'some-title')).toBe(filters);
        expect(filters.getSearchField(Fields.TITLE)).toEqual('some-title');
    });
});

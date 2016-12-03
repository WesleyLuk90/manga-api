const Capabilities = require('../sdk/Capabilities');
const Fields = require('../sdk/Fields');
const Filters = require('../sdk/Filters');

describe('Capabilities', () => {
    it('should create getters and setters with default values', () => {
        const cap = new Capabilities();
        expect(cap.supportsUrlMangaHandles()).toBe(true);
        expect(cap.setUrlMangaHandles(false)).toBe(cap);
        expect(cap.supportsUrlMangaHandles()).toBe(false);
    });

    it('should get and set tag options', () => {
        const capabilities = new Capabilities();
        expect(capabilities.supportsTagFiltering()).toBe(false);
        expect(() => capabilities.getTagOptions()).toThrowError(/Tag options not supported/);

        expect(capabilities.setTagOptions(['a', 'b', 'c'])).toBe(capabilities);

        expect(capabilities.getTagOptions()).toEqual(['a', 'b', 'c']);

        capabilities.setFilterByIncludingTags(true);
        expect(capabilities.supportsTagFiltering()).toBe(true);
    });

    it('should set searchable fields', () => {
        const capabilities = new Capabilities();
        expect(capabilities.supportsSearchingFields()).toBe(false);
        expect(() => capabilities.getSearchableFields()).toThrowError(/Searching fields not supported/);

        expect(() => capabilities.setSearchableFields({})).toThrowError(/Searchable fields must be an array/);
        expect(() => capabilities.setSearchableFields([{}])).toThrowError(/is an invalid field/);

        expect(capabilities.setSearchableFields([Fields.TITLE, Fields.AUTHOR])).toBe(capabilities);

        expect(capabilities.getSearchableFields()).toEqual([Fields.TITLE, Fields.AUTHOR]);
    });

    describe('validating filters', () => {
        let cap;
        let filters;
        beforeEach(() => {
            cap = new Capabilities();
            filters = new Filters();
        });
        it('should validate filters', () => {
            expect(cap.validateFilters(filters)).toBe(true);
        });
        it('should not validate wrong tags', () => {
            filters.setIncludedTags(['d', 'b', 'a', 'e']);
            expect(() => cap.validateFilters(filters)).toThrowError(/Tag filtering not supported/);
            cap.setTagOptions(['a', 'b', 'c']);
            cap.setFilterByIncludingTags(true);
            expect(() => cap.validateFilters(filters)).toThrowError(/Tags not supported d, e/);

            cap.setTagOptions(['a', 'b', 'c', 'd', 'e']);
            expect(cap.validateFilters(filters)).toBe(true);
        });
        it('should not validate wrong search fields', () => {

        });
    });

    describe('serializing', () => {
        it('should serialize with default properties', () => {
            const cap = new Capabilities();
            const data = JSON.parse(JSON.stringify(cap));
            const expectedProperties = [
                'urlMangaHandles',
                'urlChapterHandles',
                'urlPageHandles',
                'filterByIncludingTags',
                'filterByExcludingTags',
            ];
            expectedProperties.forEach(
                property => expect(data[property]).not.toBeUndefined());
        });
    });
});

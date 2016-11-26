const Page = require('../sdk/Page');
const PageHandle = require('../sdk/PageHandle');

describe('Page', () => {
    it('should require a page handle', () => {
        expect(() => new Page()).toThrowError(/Requires a PageHandle/);
    });

    it('should get the page handle', () => {
        const handle = new PageHandle();
        const page = new Page(handle);
        expect(page.getPageHandle()).toBe(handle);
    });

    it('should set page image', () => {
        const handle = new PageHandle();
        const page = new Page(handle);
        expect(() => page.getImageUrl()).toThrowError(/Image url has not been set/);
        expect(() => page.setImageUrl()).toThrowError(/Image url must be a string/);
        expect(page.setImageUrl('some url')).toBe(page);
        expect(page.getImageUrl()).toBe('some url');
    });
});

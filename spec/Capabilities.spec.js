const Capabilities = require('../sdk/Capabilities');

describe('Capabilities', () => {
    it('should create getters and setters with default values', () => {
        const cap = new Capabilities();
        expect(cap.supportsUrlMangaHandles()).toBe(true);
        expect(cap.getUrlMangaHandles()).toBe(true);
        expect(cap.setUrlMangaHandles(false)).toBe(cap);
        expect(cap.supportsUrlMangaHandles()).toBe(false);
        expect(cap.getUrlMangaHandles()).toBe(false);
    });
});

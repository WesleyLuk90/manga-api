const cheerio = require('cheerio');
const UrlNormalizer = require('../../repositories/UrlNormalizer');

describe('UrlNormalizer', () => {
    it('should get urls from elements', () => {
        expect(UrlNormalizer.fromAnchor(cheerio('a', '<a href="http://some.where/place">Link</a>')).get()).toBe('http://some.where/place');
    });

    it('should trim urls', () => {
        expect(UrlNormalizer.create(' http://some.where/place ').get()).toBe('http://some.where/place');
    });

    it('should ensure a scheme', () => {
        expect(UrlNormalizer.create('//some.where/place').get()).toBe('http://some.where/place');
    });

    it('should ensure suffix', () => {
        expect(UrlNormalizer.create('http://some.where/place/').ensureSuffix('page.html').get()).toBe('http://some.where/place/page.html');
        expect(UrlNormalizer.create('http://some.where/place/page.html').ensureSuffix('page.html').get()).toBe('http://some.where/place/page.html');
    });
});

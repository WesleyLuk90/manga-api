const cheerio = require('cheerio');
const HtmlToolkit = require('../../repositories/HtmlToolkit');

describe('HtmlToolkit', () => {
    it('should get text', () => {
        expect(HtmlToolkit.text('<div> a </div>')).toBe('a');
        expect(HtmlToolkit.text(cheerio.load('<div> a </div>'))).toBe('a');
    });

    it('should append query strings', () => {
        expect(HtmlToolkit.appendQueryString('http://example.com/', {
                a: 1,
                b: 2,
            }))
            .toEqual('http://example.com/?a=1&b=2');
        expect(HtmlToolkit.appendQueryString('http://example.com/?c=d', {
                a: 1,
                b: 2,
            }))
            .toEqual('http://example.com/?c=d&a=1&b=2');
    });
});

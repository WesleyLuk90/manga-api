const HtmlToolkit = require('../repositories/HtmlToolkit');

describe('HtmlToolkit', () => {
    it('should append query strings', () => {
        expect(HtmlToolkit.appendQueryString('http://example.com/', { a: 1, b: 2 }))
            .toEqual('http://example.com/?a=1&b=2');
        expect(HtmlToolkit.appendQueryString('http://example.com/?c=d', { a: 1, b: 2 }))
            .toEqual('http://example.com/?c=d&a=1&b=2');
    });
});

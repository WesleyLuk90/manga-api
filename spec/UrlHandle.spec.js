const UrlHandle = require('../sdk/UrlHandle');

fdescribe('UrlHandle', () => {
    it('should throw an error if url is missing', () => {
        expect(() => new UrlHandle().getUrl()).toThrowError(/No url set/);
    });

    it('should throw an error if url is not a string', () => {
        expect(() => new UrlHandle().setUrl({})).toThrowError(/Url must be a string/);
    });
});

const UrlHandle = require('../sdk/UrlHandle');

describe('UrlHandle', () => {
    it('should throw an error if url is missing', () => {
        expect(() => new UrlHandle().getUrl()).toThrowError(/No url set/);
    });

    it('should throw an error if url is not a string', () => {
        expect(() => new UrlHandle().setUrl({})).toThrowError(/Url must be a string/);
    });

    it('should a subclass when using the static constructor', () => {
        class MyUrlSubclass extends UrlHandle {}
        expect(MyUrlSubclass.fromUrl('someurl')).toBeInstanceOf(MyUrlSubclass);
    });
});

const UrlHandle = require('../../sdk/UrlHandle');

describe('UrlHandle', () => {
    it('should throw an error if url is missing', () => {
        expect(() => new UrlHandle().getUrl()).toThrowError(/No url set/);
    });

    it('should throw an error if url is not a string', () => {
        expect(() => new UrlHandle().setUrl({})).toThrowError(/Url must be a string/);
    });

    it('should a subclass when using the static constructor', () => {
        class MyUrlSubclass extends UrlHandle {}
        expect(MyUrlSubclass.fromUrl('someUrl')).toEqual(jasmine.any(MyUrlSubclass));
    });

    it('should serialize and deserialize', () => {
        class MyUrlSubclass extends UrlHandle {}
        const handle = MyUrlSubclass.fromUrl('a b c');

        const deserializedHandle = MyUrlSubclass.deserialize(handle.serialize());
        expect(deserializedHandle).toEqual(jasmine.any(MyUrlSubclass));
        expect(deserializedHandle.getUrl()).toBe('a b c');
    });
});

const Model = require('../../sdk/Model');
const Models = require('../../sdk/Models');

describe('Models', () => {
    class Thing {}
    class SomeModel extends Model {}
    Models.defineModel(SomeModel, {
        fields: [
            'a',
            'b',
            'anotherField',
        ],
        arrayFields: [
            'anArray',
        ],
        typedFields: [
            { id: 'thing', type: Thing },
        ],
        typedArrayFields: [
            { id: 'things', type: Thing },
        ],
    });

    it('should extend the base', () => {
        const someModel = new SomeModel();
        expect(someModel).toEqual(jasmine.any(SomeModel));
        expect(someModel).toEqual(jasmine.any(Model));
    });

    it('should provide a create', () => {
        expect(SomeModel.create()).toEqual(new SomeModel());
    });

    it('should have fields', () => {
        const someModel = new SomeModel();
        expect(someModel.getA()).toBe(null);
        expect(someModel.getB()).toBe(null);
        expect(someModel.getAnotherField()).toBe(null);
        expect(someModel.getAnArray()).toEqual(null);

        expect(someModel.a).toBe(null);
        expect(someModel.b).toBe(null);
        expect(someModel.anotherField).toBe(null);
        expect(someModel.anArray).toEqual(null);
    });

    it('should set and get fields', () => {
        const someModel = new SomeModel();
        expect(someModel.setA('10')).toBe(someModel);
        expect(someModel.setAnArray(['a'])).toBe(someModel);
        expect(someModel.setThing(new Thing())).toBe(someModel);
        expect(someModel.setThings([new Thing()])).toBe(someModel);

        expect(someModel.getA()).toBe('10');
        expect(someModel.getAnArray()).toEqual(['a']);
        expect(someModel.getThing()).toEqual(new Thing());
        expect(someModel.getThings()).toEqual([new Thing()]);
    });

    it('should require a value', () => {
        const someModel = new SomeModel();
        expect(() => someModel.setA(null)).toThrowError('Expected a string but got \'null\'');
        expect(() => someModel.setAnArray(null)).toThrowError('Expected an array but got \'null\'');
    });

    describe('builder', () => {
        it('should have a builder', () => {
            const builder = SomeModel.builder();

            expect(builder.getA()).toBe(null);
            expect(builder.setA('10')).toBe(builder);
            expect(builder.getA()).toBe('10');

            expect(builder.getAnArray()).toEqual(null);
            expect(builder.setAnArray(['b'])).toBe(builder);
            expect(builder.getAnArray()).toEqual(['b']);

            expect(builder.getThing()).toEqual(null);
            expect(builder.setThing(new Thing())).toBe(builder);
            expect(builder.getThing()).toEqual(new Thing());

            expect(builder.getThings()).toEqual(null);
            expect(builder.setThings([new Thing()])).toBe(builder);
            expect(builder.getThings()).toEqual([new Thing()]);
        });

        it('should can set nullable', () => {
            const builder = SomeModel.builder();
            expect(builder.setA(null)).toBe(builder);
            expect(builder.getA()).toBe(null);
            expect(builder.setAnArray(null)).toBe(builder);
            expect(builder.getAnArray()).toEqual(null);
        });

        it('can create', () => {
            const builder = SomeModel.builder();
            const model = builder.setA('10').setAnArray(['b']).create();
            expect(model).toEqual(SomeModel.create().setA('10').setAnArray(['b']));
        });
    });
});

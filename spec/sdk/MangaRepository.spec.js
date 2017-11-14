const MangaRepository = require('../../sdk/MangaRepository');
const Filters = require('../../sdk/Filters');
const SearchOptions = require('../../sdk/SearchOptions');
const AbstractSearchOperation = require('../../sdk/operations/AbstractSearchOperation');
const AbstractCapabilitiesOperation = require('../../sdk/operations/AbstractCapabilitiesOperation');
const AbstractGetMangaOperation = require('../../sdk/operations/AbstractGetMangaOperation');
const MangaHandle = require('../../sdk/MangaHandle');

describe('MangaRepository', () => {
    it('should have abstract methods', () => {
        const repo = new MangaRepository();
        expect(() => repo.search()).toThrowError(/Not Implemented/);
        expect(() => repo.getCapabilities()).toThrowError(/Not Implemented/);
        expect(() => repo.getManga()).toThrowError(/Not Implemented/);
        expect(() => repo.getChapter()).toThrowError(/Not Implemented/);
        expect(() => repo.getPage()).toThrowError(/Not Implemented/);
        expect(() => repo.isForHandle()).toThrowError(/Not Implemented/);
        expect(() => repo.listLatest()).toThrowError(/Not Implemented/);
    });

    describe('operations', () => {
        it('should add operations', () => {
            class Impl extends AbstractGetMangaOperation {

            }

            const repo = new MangaRepository();
            repo.addOperation(Impl);
            expect(repo.getOperation(AbstractGetMangaOperation)).toBe(Impl);
            expect(repo.get(AbstractGetMangaOperation)).toEqual(jasmine.any(Impl));
        });

        it('should ensure operations are valid', () => {
            expect(() => new MangaRepository().addOperation({})).toThrowError(/Expected an operation but got \[object Object]/);
        });
    });

    describe('search', () => {
        let repo;
        class Operation extends AbstractSearchOperation {}

        beforeEach(() => {
            repo = new MangaRepository();
            spyOn(Operation.prototype, 'search').and.returnValue(new Promise(() => {}));
            repo.addOperation(Operation);
        });

        it('should validate search arguments', () => {
            expect(() => repo.search(null, null)).not.toThrowError();
            expect(() => repo.search(new Filters(), null)).not.toThrowError();
            expect(() => repo.search(new Filters(), new SearchOptions())).not.toThrowError();

            expect(() => repo.search({})).toThrowError(/Requires filter/);
            expect(() => repo.search(new Filters(), {})).toThrowError(/Expected options/);
        });

        it('should use search operation', () => {
            repo.search();
            expect(Operation.prototype.search).toHaveBeenCalled();
        });
    });

    describe('capabilities', () => {
        let repo;

        class Operation extends AbstractCapabilitiesOperation {}

        beforeEach(() => {
            repo = new MangaRepository();
            spyOn(Operation.prototype, 'getCapabilities');
            repo.addOperation(Operation);
        });
        it('should implement operation', () => {
            repo.getCapabilities();
            expect(Operation.prototype.getCapabilities).toHaveBeenCalled();
        });
    });

    describe('get manga', () => {
        let repo;

        class Operation extends AbstractGetMangaOperation {}

        beforeEach(() => {
            repo = new MangaRepository();
            repo.addOperation(Operation);
            spyOn(Operation.prototype, 'getManga');
        });

        it('should check arguments', () => {
            expect(() => repo.getManga({})).toThrowError(/Requires a MangaHandle/);
        });

        it('should check return value', () => {
            Operation.prototype.getManga.and.returnValue({});
            expect(() => repo.getManga(new MangaHandle())).toThrowError(/Expected operation to return a promise/);
        });

        it('return the correct value', () => {
            Operation.prototype.getManga.and.returnValue(Promise.resolve({}));
            return repo.getManga(new MangaHandle())
                .then(() => {
                    expect(Operation.prototype.getManga).toHaveBeenCalled();
                });
        });
    });
});

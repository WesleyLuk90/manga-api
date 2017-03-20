const MangaRepository = require('../sdk/MangaRepository');
const Filters = require('../sdk/Filters');
const SearchOptions = require('../sdk/SearchOptions');
const AbstractSearchOperation = require('../sdk/AbstractSearchOperation');
const AbstractCapabilitiesOperation = require('../sdk/AbstractCapabilitiesOperation');
const AbstractGetMangaOperation = require('../sdk/AbstractGetMangaOperation');
const MangaHandle = require('../sdk/MangaHandle');

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

    describe('search', () => {
        let repo;
        let searchOperation;

        beforeEach(() => {
            repo = new MangaRepository();
            searchOperation = new AbstractSearchOperation();
            spyOn(searchOperation, 'search').and.returnValue(new Promise(() => {}));
            repo.setSearchOperation(searchOperation);
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
            expect(searchOperation.search).toHaveBeenCalled();
        });
    });

    describe('capabilities', () => {
        let repo;
        let operation;
        beforeEach(() => {
            repo = new MangaRepository();
            operation = new AbstractCapabilitiesOperation();
            spyOn(operation, 'getCapabilities');
            repo.setCapabilitiesOperation(operation);
        });
        it('should implement operation', () => {
            repo.getCapabilities();
            expect(operation.getCapabilities).toHaveBeenCalled();
        });
    });

    describe('get manga', () => {
        let repo;
        let operation;

        beforeEach(() => {
            repo = new MangaRepository();
            operation = new AbstractGetMangaOperation();
            repo.setGetMangaOperation(operation);
            spyOn(operation, 'getManga');
        });

        it('should check arguments', () => {
            expect(() => repo.getManga({})).toThrowError(/Requires a MangaHandle/);
        });

        it('should check return value', () => {
            operation.getManga.and.returnValue({});
            expect(() => repo.getManga(new MangaHandle())).toThrowError(/Expected operation to return a promise/);
        });
        it('should check return value', () => {
            operation.getManga.and.returnValue(new Promise(() => {}));
            repo.getManga(new MangaHandle());
            expect(operation.getManga).toHaveBeenCalled();
        });
    });
});

const MangaRepository = require('../sdk/MangaRepository');
const Filters = require('../sdk/Filters');
const SearchOptions = require('../sdk/SearchOptions');
const AbstractSearchOperation = require('../sdk/AbstractSearchOperation');
const AbstractCapabilitiesOperation = require('../sdk/AbstractCapabilitiesOperation');

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

            expect(() => repo.search({})).toThrowError(/Expected filters/);
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
});

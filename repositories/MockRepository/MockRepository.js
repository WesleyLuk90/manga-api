const MockListLatest = require('./MockListLatest');
const MangaRepository = require('../../sdk/MangaRepository');
const MangaHandle = require('../../sdk/MangaHandle');
const MockSearchOperation = require('./MockSearchOperation');
const MockCapabilitiesOperation = require('./MockCapabilitiesOperation');
const MockGetMangaOperation = require('./MockGetMangaOperation');
const MockGetChapterOperation = require('./MockGetChapterOperation');
const MockGetPageOperation = require('./MockGetPageOperation');

class MockRepository extends MangaRepository {
    constructor() {
        super();
        this.addOperation(MockSearchOperation);
        this.addOperation(MockCapabilitiesOperation);
        this.addOperation(MockGetMangaOperation);
        this.addOperation(MockGetChapterOperation);
        this.addOperation(MockGetPageOperation);
        this.addOperation(MockListLatest);
    }

    isForHandle(handle) {
        return !!handle.url.match(/^mock:\/\//);
    }
}
module.exports = MockRepository;

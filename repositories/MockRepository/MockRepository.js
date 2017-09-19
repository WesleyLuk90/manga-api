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
    }

    isForHandle(handle) {
        return !!handle.url.match(/^mock:\/\//);
    }

    listLatest() {
        return Promise.resolve([MangaHandle.fromUrl('mock://manga'), MangaHandle.fromUrl('mock://manga')]);
    }
}
module.exports = MockRepository;

const MangaRepository = require('../../sdk/MangaRepository');
const Page = require('../../sdk/Page');
const Chapter = require('../../sdk/Chapter');
const MangaHandle = require('../../sdk/MangaHandle');
const PageHandle = require('../../sdk/PageHandle');
const MockSearchOperation = require('./MockSearchOperation');
const MockCapabilitiesOperation = require('./MockCapabilitiesOperation');
const MockGetMangaOperation = require('./MockGetMangaOperation');

class MockRepository extends MangaRepository {
    constructor() {
        super();
        this.setSearchOperation(new MockSearchOperation());
        this.setCapabilitiesOperation(new MockCapabilitiesOperation());
        this.setGetMangaOperation(new MockGetMangaOperation());
    }

    getChapter(chapterHandle) {
        this._checkChapterHandle(chapterHandle);
        return Promise.resolve(new Chapter(chapterHandle).setPages([PageHandle.fromUrl('mock://page')]));
    }

    getPage(pageHandle) {
        this._checkPageHandle(pageHandle);
        return Promise.resolve(new Page(pageHandle).setImageUrl('mock://image'));
    }

    isForHandle(handle) {
        return !!handle.url.match(/^mock:\/\//);
    }

    listLatest() {
        return Promise.resolve([MangaHandle.fromUrl('mock://manga'), MangaHandle.fromUrl('mock://manga')]);
    }
}
module.exports = MockRepository;

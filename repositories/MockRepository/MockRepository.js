const MangaRepository = require('../../sdk/MangaRepository');
const Capabilities = require('../../sdk/Capabilities');
const Page = require('../../sdk/Page');
const Chapter = require('../../sdk/Chapter');
const Manga = require('../../sdk/Manga');
const Filters = require('../../sdk/Filters');
const MangaHandle = require('../../sdk/MangaHandle');
const ChapterHandle = require('../../sdk/ChapterHandle');
const PageHandle = require('../../sdk/PageHandle');

class MockRepository extends MangaRepository {
    getCapabilities() {
        return new Capabilities();
    }

    search(filters, options) {
        filters = filters || new Filters();
        this._checkFilters(filters);
        return Promise.resolve([MangaHandle.fromUrl('mock://manga')]);
    }

    getManga(mangaHandle) {
        this._checkMangaHandle(mangaHandle);
        return Promise.resolve(new Manga(mangaHandle).setChapters([ChapterHandle.fromUrl('mock://chapter')]));
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
}
module.exports = MockRepository;

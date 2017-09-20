const MangaKakalotGetManga = require('./MangaKakalotGetManga');
const MangaKakalotGetChapter = require('./MangaKakalotGetChapter');
const MangaKakalotGetPage = require('./MangaKakalotGetPage');
const MangaKakalotCapabilitiesOperation = require('./MangaKakalotCapabilitiesOperation');
const MangaRepository = require('../../sdk/MangaRepository');

module.exports = class MangaKakalot extends MangaRepository {

    constructor() {
        super();
        this.addOperation(MangaKakalotGetManga);
        this.addOperation(MangaKakalotGetChapter);
        this.addOperation(MangaKakalotGetPage);
        this.addOperation(MangaKakalotCapabilitiesOperation);
    }

    isForHandle(handle) {
        return !!handle.url.match(/^http:\/\/mangakakalot\.com\//) ||
            !!handle.url.match(/^http:\/\/manganel\.com\//) ||
            !!handle.url.match(/^http:\/\/[a-z0-9.]*mpcdn\.net\//);
    }
};

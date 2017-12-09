const MangaFoxListLatest = require('./MangaFoxListLatest');
const MangaRepository = require('../../sdk/MangaRepository');
const MangaFoxSearch = require('./MangaFoxSearch');
const MangaFoxCapabilitiesOperation = require('./MangaFoxCapabilitiesOperation');
const MangaFoxGetManga = require('./MangaFoxGetManga');
const MangaFoxGetChapter = require('./MangaFoxGetChapter');
const MangaFoxGetPage = require('./MangaFoxGetPage');

class MangaFox extends MangaRepository {

    constructor() {
        super();
        this.addOperation(MangaFoxSearch);
        this.addOperation(MangaFoxCapabilitiesOperation);
        this.addOperation(MangaFoxGetManga);
        this.addOperation(MangaFoxGetChapter);
        this.addOperation(MangaFoxGetPage);
        this.addOperation(MangaFoxListLatest);
    }

    isForHandle(handle) {
        return !!handle.url.match(/^http:\/\/mangafox\.la\//);
    }
}

module.exports = MangaFox;

const MangaRepository = require('../../sdk/MangaRepository');
const MangaFoxSearch = require('./MangaFoxSearch');
const MangaFoxCapabilitiesOperation = require('./MangaFoxCapabilitiesOperation');
const MangaFoxGetManga = require('./MangaFoxGetManga');
const MangaFoxGetChapter = require('./MangaFoxGetChapter');
const MangaFoxGetPage = require('./MangaFoxGetPage');

class MangaFox extends MangaRepository {

    constructor() {
        super();
        this.setSearchOperation(new MangaFoxSearch());
        this.setCapabilitiesOperation(new MangaFoxCapabilitiesOperation());
        this.setGetMangaOperation(new MangaFoxGetManga());
        this.setGetChapterOperation(new MangaFoxGetChapter());
        this.setGetPageOperation(new MangaFoxGetPage());
    }

    listLatest() {
        return this.search();
    }

    isForHandle(handle) {
        return !!handle.url.match(/^http:\/\/mangafox\.me\//);
    }
}

module.exports = MangaFox;

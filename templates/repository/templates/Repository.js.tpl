const MangaRepository = require('../../sdk/MangaRepository');
const <%= repository_name %>Search = require('./<%= repository_name %>Search');
const <%= repository_name %>Capabilities = require('./<%= repository_name %>Capabilities');
const <%= repository_name %>GetManga = require('./<%= repository_name %>GetManga');
const <%= repository_name %>GetChapter = require('./<%= repository_name %>GetChapter');
const <%= repository_name %>GetPage = require('./<%= repository_name %>GetPage');

class <%= repository_name %> extends MangaRepository {

    constructor() {
        super();
        this.setSearchOperation(new <%= repository_name %>Search());
        this.setCapabilitiesOperation(new <%= repository_name %>Capabilities());
        this.setGetMangaOperation(new <%= repository_name %>GetManga());
        this.setGetChapterOperation(new <%= repository_name %>GetChapter());
        this.setGetPageOperation(new <%= repository_name %>GetPage());
    }

    isForHandle(handle) {
        throw new Error('Not Implemented');
    }
}

module.exports = <%= repository_name %>;

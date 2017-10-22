const AbstractGetMangaOperation = require('../../sdk/operations/AbstractGetMangaOperation');

module.exports = class <%= repository_name %>GetManga extends AbstractGetMangaOperation {
    getManga(mangaHandle) {
        throw new Error('Not Implemented');
    }
};

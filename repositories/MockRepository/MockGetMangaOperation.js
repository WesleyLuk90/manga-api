const Manga = require('../../sdk/Manga');
const ChapterHandle = require('../../sdk/ChapterHandle');
const AbstractGetMangaOperation = require('../../sdk/operations/AbstractGetMangaOperation');

module.exports = class MockGetMangaOperation extends AbstractGetMangaOperation {
    getManga(mangaHandle) {
        return Promise.resolve(new Manga(mangaHandle).setChapters([ChapterHandle.fromUrl('mock://chapter')]));
    }
};

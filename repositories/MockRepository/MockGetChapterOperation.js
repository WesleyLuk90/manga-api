const AbstractGetChapterOperation = require('../../sdk/AbstractGetChapterOperation');
const Chapter = require('../../sdk/Chapter');
const PageHandle = require('../../sdk/PageHandle');

module.exports = class MockGetChapterOperation extends AbstractGetChapterOperation {
    getChapter(chapterHandle) {
        return Promise.resolve(new Chapter(chapterHandle).setPages([PageHandle.fromUrl('mock://page')]));
    }
};

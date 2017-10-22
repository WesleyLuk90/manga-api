const AbstractGetChapterOperation = require('../../sdk/operations/AbstractGetChapterOperation');

module.exports = class <%= repository_name %>GetChapter extends AbstractGetChapterOperation {
    getChapter(chapterHandle) {
        throw new Error('Not Implemented');
    }
};

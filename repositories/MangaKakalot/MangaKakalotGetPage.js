const Page = require('../../sdk/Page');
const AbstractGetPageOperation = require('../../sdk/operations/AbstractGetPageOperation');

module.exports = class MangaFoxGetPage extends AbstractGetPageOperation {
    getPage(pageHandle) {
        return Promise.resolve(new Page(pageHandle)
            .setImageUrl(pageHandle.url));
    }
};

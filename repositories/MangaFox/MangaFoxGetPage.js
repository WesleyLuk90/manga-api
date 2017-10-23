const Request = require('../Request');
const Page = require('../../sdk/Page');
const AbstractGetPageOperation = require('../../sdk/operations/AbstractGetPageOperation');

module.exports = class MangaFoxGetPage extends AbstractGetPageOperation {
    getPage(pageHandle) {
        return Request.get(pageHandle.getUrl())
            .then((res) => {
                const $ = res.document;
                return new Page(pageHandle)
                    .setImageUrl($('#image').attr('src'));
            });
    }
};

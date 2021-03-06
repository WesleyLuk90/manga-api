const AbstractGetPageOperation = require('../../sdk/operations/AbstractGetPageOperation');
const Page = require('../../sdk/Page');

module.exports = class MockGetPageOperation extends AbstractGetPageOperation {
    getPage(pageHandle) {
        return Promise.resolve(new Page(pageHandle).setImageUrl('mock://image'));
    }
};

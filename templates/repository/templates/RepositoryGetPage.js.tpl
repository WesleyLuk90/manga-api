const AbstractGetPageOperation = require('../../sdk/operations/AbstractGetPageOperation');

module.exports = class <%= repository_name %>GetPage extends AbstractGetPageOperation {
    getPage(pageHandle) {
        throw new Error('Not Implemented');
    }
};

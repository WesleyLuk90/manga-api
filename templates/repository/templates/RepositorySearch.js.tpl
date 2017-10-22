const AbstractSearchOperation = require('../../sdk/operations/AbstractSearchOperation');

module.exports = class <%= repository_name %>Search extends AbstractSearchOperation {
    search(filters, options) {
        throw new Error('Not Implemented');
    }
};

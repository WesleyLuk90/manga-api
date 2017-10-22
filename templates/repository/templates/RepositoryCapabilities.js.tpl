const AbstractCapabilitiesOperation = require('../../sdk/operations/AbstractCapabilitiesOperation');

module.exports = class <%= repository_name %>Capabilities extends AbstractCapabilitiesOperation {
    getCapabilities() {
        throw new Error('Not Implemented');
    }
};

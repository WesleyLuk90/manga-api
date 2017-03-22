const AbstractCapabilitiesOperation = require('../../sdk/AbstractCapabilitiesOperation');

module.exports = class <%= repository_name %>Capabilities extends AbstractCapabilitiesOperation {
    getCapabilities() {
        throw new Error('Not Implemented');
    }
};

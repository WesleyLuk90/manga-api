const AbstractCapabilitiesOperation = require('../../sdk/operations/AbstractCapabilitiesOperation');
const Capabilities = require('../../sdk/Capabilities');

module.exports = class MockCapabilitiesOperation extends AbstractCapabilitiesOperation {
    getCapabilities() {
        return new Capabilities();
    }
};

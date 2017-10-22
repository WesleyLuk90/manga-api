const Capabilities = require('../../sdk/Capabilities');
const AbstractCapabilitiesOperation = require('../../sdk/operations/AbstractCapabilitiesOperation');

module.exports = class MangaKakalotCapabilitiesOperation extends AbstractCapabilitiesOperation {
    getCapabilities() {
        return new Capabilities();
    }
};

const Capabilities = require('../../sdk/Capabilities');
const AbstractCapabilitiesOperation = require('../../sdk/AbstractCapabilitiesOperation');

module.exports = class MangaKakalotCapabilitiesOperation extends AbstractCapabilitiesOperation {
    getCapabilities() {
        return new Capabilities();
    }
};

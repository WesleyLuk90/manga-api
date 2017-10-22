module.exports = class AbstractCapabilitiesOperation {
    getCapabilities() {
        throw new Error('Not Implemented');
    }

    supportsSearching() {
        return false;
    }

    supportsUrlChapterHandles() {
        return true;
    }

    supportsUrlPageHandles() {
        return true;
    }
};

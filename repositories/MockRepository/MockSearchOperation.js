const MangaHandle = require('../../sdk/MangaHandle');
const AbstractSearchOperation = require('../../sdk/operations/AbstractSearchOperation');

module.exports = class MockSearchOperation extends AbstractSearchOperation {
    search() {
        return Promise.resolve([MangaHandle.fromUrl('mock://manga')]);
    }
};

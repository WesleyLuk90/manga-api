const MangaFox = require('./MangaFox/MangaFox');

const RepositoryList = require('./RepositoryList');

const ToolKit = require('./ToolKit');

class RepositoryListFactory {
    static create() {
        new ToolKit().initialize();
        return new RepositoryList()
            .add(new MangaFox());
    }
}

module.exports = RepositoryListFactory;

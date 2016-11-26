const MangaFox = require('./MangaFox/MangaFox');

const RepositoryList = require('./RepositoryList');

class RepositoryListFactory {
    static create() {
        return new RepositoryList()
            .add(new MangaFox());
    }
}

module.exports = RepositoryListFactory;

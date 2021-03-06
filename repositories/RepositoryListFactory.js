const RepositoryList = require('./RepositoryList');

const MangaFox = require('./MangaFox/MangaFox');
const MangaKakalot = require('./MangaKakalot/MangaKakalot');
const MockRepository = require('./MockRepository/MockRepository');

class RepositoryListFactory {
    static create() {
        return new RepositoryList()
            .add(new MangaFox())
            .add(new MangaKakalot())
            .add(new MockRepository(), true);
    }
}

module.exports = RepositoryListFactory;

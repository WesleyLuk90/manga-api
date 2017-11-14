const assert = require('assert');
const MangaRepository = require('../sdk/MangaRepository');
const MangaVisitor = require('../sdk/MangaVisitor');

module.exports = class Serializer {
    constructor(repositoryList) {
        this.repositoryList = repositoryList;
    }

    serializeMangaVisitor(repository, mangaVisitor) {
        assert(repository instanceof MangaRepository);
        assert(mangaVisitor instanceof MangaVisitor);
        return JSON.stringify({
            repository: repository.getName(),
            mangaVisitor: mangaVisitor.serialize(),
        });
    }

    deserializeMangaVisitor(serialized) {
        const data = JSON.parse(serialized);
        const repository = this.repositoryList.get(data.repository);
        return repository.listLatest().deserialize(data.mangaVisitor);
    }
};

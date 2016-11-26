class RepositoryList {
    constructor() {
        this.repositories = [];
    }
    add(repository) {
        this.repositories.push(repository);
        return this;
    }
    getAll() {
        return this.repositories.slice();
    }
}

module.exports = RepositoryList;

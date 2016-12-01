class RepositoryList {
    constructor() {
        this.repositories = [];
        this.repositoriesByName = new Map();
    }
    add(repository, skipList) {
        if (!skipList) {
            this.repositories.push(repository);
        }
        this.repositoriesByName.set(repository.getName(), repository);
        return this;
    }
    getAll() {
        return this.repositories.slice();
    }

    get(name) {
        if (typeof name !== 'string') {
            throw new Error('Expected a string');
        }
        return this.repositoriesByName.get(name) || null;
    }
}

module.exports = RepositoryList;

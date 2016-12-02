const UrlHandle = require('../sdk/UrlHandle');

class RepositoryList {
    constructor() {
        this.repositories = [];
        this.allRepositories = [];
        this.repositoriesByName = new Map();
    }
    add(repository, skipList) {
        if (!skipList) {
            this.repositories.push(repository);
        }
        this.allRepositories.push(repository);
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

    getRepositoryForHandle(handle) {
        if (!(handle instanceof UrlHandle)) {
            throw new Error('Expected a UrlHandle');
        }
        return this.allRepositories
            .filter(r => r.isForHandle(handle))[0] || null;
    }
}

module.exports = RepositoryList;

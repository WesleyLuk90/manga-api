const lodash = require('lodash');
const assert = require('assert');
const CreateHttpClientOperation = require('./operations/CreateHttpClientOperation');

const DEPENDENCY_TO_OPERATION = {
    HttpClient: CreateHttpClientOperation,
};

module.exports = class DependencyInjector {
    constructor(repository) {
        assert(repository);
        this.repository = repository;
        this.cache = new Map();
    }

    get(dependency) {
        if (!this.cache.has(dependency)) {
            const factoryOperation = DEPENDENCY_TO_OPERATION[dependency];
            assert(factoryOperation, `Unknown dependency ${dependency}`);
            const created = this.repository.get(factoryOperation).get();
            this.cache.set(dependency, created);
        }
        return this.cache.get(dependency);
    }

    inject(operation) {
        const injects = (operation.constructor.$inject || []);
        injects.forEach((d) => {
            operation[lodash.camelCase(d)] = this.get(d);
        });
        return operation;
    }
};

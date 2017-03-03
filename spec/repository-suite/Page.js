const Rx = require('rx');
const assertDataMatches = require('./util').assertDataMatches;
const PageHandle = require('../../sdk/PageHandle');

module.exports = function setupPageTests(repository, page) {
    it('should get page data', (done) => {
        Rx.Observable.from(page)
            .flatMapWithMaxConcurrent(1, pageData => Rx.Observable.defer(() => {
                const pageHandle = PageHandle.unserialize(pageData.handle);
                expect(repository.isForHandle(pageHandle)).toBe(true);
                return repository.getPage(pageHandle)
                    .then((pageResults) => {
                        assertDataMatches(pageResults, pageData.results);
                    })
                    .then(null, (e) => {
                        console.log('got an error', e);
                        throw e;
                    });
            }))
            .finally(done)
            .subscribe(() => {}, fail);
    });
};

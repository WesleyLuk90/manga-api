const bluebird = require('bluebird');
const AbstractGetPageOperation = require('../../../sdk/operations/AbstractGetPageOperation');
const PageHandle = require('../../../sdk/PageHandle');
const Assertions = require('../Assertions');

module.exports = function setupPageTests(repository, fixture) {
    if (!Assertions.assertOperationFixture(repository, AbstractGetPageOperation, fixture, 'page_tests')) {
        return;
    }

    it('should get page data', () => {
        return bluebird.mapSeries(fixture.page_tests, (pageData) => {
            const pageHandle = PageHandle.deserialize(pageData.handle);
            expect(repository.isForHandle(pageHandle)).toBe(true);
            return repository.getPage(pageHandle)
                .then((pageResults) => {
                    Assertions.assertDataMatches(pageResults, pageData.results);
                })
                .then(null, (e) => {
                    console.log('got an error', e);
                    throw e;
                });
        });
    });
};

const bluebird = require('bluebird');
const assertDataMatches = require('./util').assertDataMatches;
const PageHandle = require('../../sdk/PageHandle');

module.exports = function setupPageTests(repository, pages) {
    if (!pages) {
        console.warn(`No page test data for ${repository.getName()}`);
        return;
    }
    it('should get page data', () => {
        return bluebird.mapSeries(pages, (pageData) => {
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
        });
    });
};

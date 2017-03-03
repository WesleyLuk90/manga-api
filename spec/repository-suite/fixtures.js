const path = require('path');

module.exports = function getFixture(repository) {
    const testDataPath = path.join(__dirname, `../fixtures/${repository.getName()}.data.js`);
    let data = null;
    try {
        /* eslint-disable */
        data = require(testDataPath);
        /* eslint-enable */
    } catch (e) {
        console.warn(`No test data found for ${repository.getName()} at ${testDataPath}`);
    }
    return data;
};

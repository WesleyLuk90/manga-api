const path = require('path');

module.exports = class FixtureLoader {
    static loadDefaultFixture(repository) {
        return this.loadFixture(this.getFixturePath(repository), true);
    }

    static loadFixture(dataPath, unchecked) {
        let data = {};
        try {
            // eslint-disable-next-line global-require, import/no-dynamic-require
            data = require(dataPath);
        } catch (e) {
            if (unchecked) {
                throw e;
            }
            console.warn(`No test data found at ${dataPath}`);
        }
        return data;
    }

    static getFixturePath(repository) {
        return path.join(__dirname, `./fixtures/${repository.getName()}.data.js`);
    }
};

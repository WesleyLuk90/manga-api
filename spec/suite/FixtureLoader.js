const path = require('path');
const Ajv = require('ajv');
const schema = require('./fixture_schema');

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
        const ajv = new Ajv();
        const valid = ajv.validate(schema, data);
        if (!valid) {
            console.error(ajv.errors);
            throw new Error(ajv.errorsText());
        }
        return data;
    }

    static getFixturePath(repository) {
        return path.join(__dirname, `./fixtures/${repository.getName()}.data.js`);
    }
};

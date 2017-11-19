const HttpClient = require('../HttpClient');

module.exports = class CreateHttpClientOperation {
    get() {
        return new HttpClient();
    }
};

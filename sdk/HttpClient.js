const superagent = require('superagent');
const cheerio = require('cheerio');

module.exports = class HttpClient {
    constructor() {
        this.agent = superagent.agent();
    }

    getDocument(url) {
        return this.getRaw(url)
            .then((res) => {
                return cheerio.load(res.text);
            });
    }

    getRaw(url) {
        return this.agent.get(url);
    }
};

const cheerio = require('cheerio');
const superagent = require('superagent');
const lodash = require('lodash');

module.exports = class Request {
    static create() {
        return new Request();
    }

    static get(url) {
        return Request.create().get(url);
    }

    static initialize() {
        if (Request.initialized) {
            return;
        }
        Request.initialized = true;
        const Req = superagent.Request;
        const originalEnd = Req.prototype.end;
        Req.prototype.end = function newEnd(cb) {
            return originalEnd.call(this, (err, response) => {
                if (err) {
                    cb(err, response);
                    return;
                }
                const responseWithDocument = response;
                if (lodash.startsWith(response.type, 'text/html')) {
                    try {
                        responseWithDocument.document = cheerio.load(responseWithDocument.text);
                    } catch (e) {
                        console.warn(e);
                        responseWithDocument.document = e;
                    }
                }
                cb(err, responseWithDocument);
            });
        };
    }

    constructor() {
        Request.initialize();
        this.agent = superagent.agent();
    }

    get(url) {
        return this.agent.get(url);
    }
};

const superagent = require('superagent');
const cheerio = require('cheerio');

class ToolKit {
    initialize() {
        const Request = superagent.Request;
        const originalEnd = Request.prototype.end;
        Request.prototype.end = function newEnd(cb) {
            return originalEnd.call(this, (err, response) => {
                if (err) {
                    cb(err, response);
                    return;
                }
                const responseWithDocument = response;
                try {
                    responseWithDocument.document = cheerio.load(responseWithDocument.text);
                } catch (e) {
                    responseWithDocument.document = e;
                }
                cb(err, responseWithDocument);
            });
        };
    }
}

module.exports = ToolKit;

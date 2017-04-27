const superagent = require('superagent');
const ToolKit = require('../repositories/ToolKit');
const http = require('http');

describe('Toolkit', () => {
    let server;

    beforeEach((done) => {
        server = http.createServer((req, res) => {
            res.end('<html>Hello</html>');
        });
        server.listen(done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it('should handle connection errors', (done) => {
        new ToolKit().initialize();
        superagent.get('http://invalid.local')
            .then(fail)
            .catch((e) => {
                expect(e.code).toBe('ENOTFOUND');
            })
            .catch(fail)
            .then(done);
    });

    it('should parse the document to the response', (done) => {
        new ToolKit().initialize();
        superagent.get(`http://localhost:${server.address().port}`)
            .then((res) => {
                expect(res.document).toBeTruthy();
            })
            .catch(fail)
            .then(done);
    });
});

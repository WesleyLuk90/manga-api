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

    it('should handle connection errors', () => {
        new ToolKit().initialize();
        return superagent.get('http://invalid.local')
            .timeout({
                deadline: 1,
            })
            .then(fail)
            .catch((e) => {
                expect(e.code).toMatch(/ECONNABORTED|ENOTFOUND/);
            });
    });

    it('should parse the document to the response', () => {
        new ToolKit().initialize();
        return superagent.get(`http://localhost:${server.address().port}`)
            .then((res) => {
                expect(res.document).toBeTruthy();
            });
    });
});

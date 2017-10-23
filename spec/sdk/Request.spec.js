const http = require('http');
const Request = require('../../repositories/Request');

describe('Request', () => {
    let server;

    beforeEach((done) => {
        server = http.createServer((req, res) => {
            if (req.url === '/html') {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                });
                res.end('<html>Hello</html>');
                return;
            }
            res.end('text');
        });
        server.listen(done);
    });

    afterEach((done) => {
        server.close(done);
    });

    it('should handle connection errors', () => {
        return Request.get('http://invalid.local')
            .timeout({
                deadline: 1,
            })
            .then(fail)
            .catch((e) => {
                expect(e.code).toMatch(/ECONNABORTED|ENOTFOUND/);
            });
    });

    it('should parse the document to the response', () => {
        return Request.get(`http://localhost:${server.address().port}/html`)
            .then((res) => {
                expect(res.text).toBe('<html>Hello</html>');
                expect(res.document).toBeTruthy();
            });
    });

    it('should not the document to other responses', () => {
        return Request.get(`http://localhost:${server.address().port}/`)
            .then((res) => {
                expect(res.document).toBeFalsy();
                expect(res.text).toBe('text');
            });
    });
});

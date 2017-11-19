const http = require('http');
const HttpClient = require('../../sdk/HttpClient');

describe('HttpClient', () => {
    let server;
    let port;
    beforeEach(() => {
        server = http.createServer((req, res) => {
            if (req.url === '/cookie') {
                const match = (req.headers.cookie || '').match(/counter=(\d)/);
                const next = (match ? parseInt(match[1], 10) : 0) + 1;
                res.setHeader('Set-Cookie', `counter=${next}`);
                res.end(String(next));
            } else {
                res.end('<html><body>Stuff</body></html>');
            }
        });
        server.listen();
        port = server.address().port;
    });

    afterEach(() => {
        server.close();
        server = null;
    });

    it('should get a document', () => {
        return new HttpClient().getDocument(`http://localhost:${port}`)
            .then(($) => {
                expect($('body').text()).toBe('Stuff');
            });
    });

    it('should get raw', () => {
        return new HttpClient().getRaw(`http://localhost:${port}`)
            .then((res) => {
                expect(res.text).toMatch(/Stuff/);
            });
    });

    it('should persist cookies', () => {
        const client = new HttpClient();
        return client.getRaw(`http://localhost:${port}/cookie`)
            .then((res) => {
                expect(res.text).toBe('1');
            })
            .then(() => client.getRaw(`http://localhost:${port}/cookie`))
            .then((res) => {
                expect(res.text).toBe('2');
            })
            .then(() => new HttpClient().getRaw(`http://localhost:${port}/cookie`))
            .then((res) => {
                expect(res.text).toBe('1');
            });
    });
});

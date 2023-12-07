const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {

    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const contentType = getContentType(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/html';
    }
}
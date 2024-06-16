
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 5000;

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
        const boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parts = body.split(`--${boundary}`);
            parts.forEach(part => {
                if (part.includes('Content-Disposition: form-data;')) {
                    const filename = part.match(/filename="(.+)"/)[1];
                    const contentType = part.match(/Content-Type: (.+)/)[1];
                    const start = part.indexOf('\r\n\r\n') + 4;
                    const fileContent = part.substring(start, part.indexOf(`\r\n--`));

                    const filePath = path.join(__dirname, 'uploads', filename);
                    fs.writeFile(filePath, fileContent, 'binary', (err) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'File upload failed', error: err }));
                            return;
                        }

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'File uploaded successfully', file: filename }));
                    });
                }
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

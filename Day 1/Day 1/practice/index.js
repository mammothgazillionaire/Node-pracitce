const http = require('http');

const hostname = '127.0.0.1';
const port = 7000;

const server = http.createServer();
server.on('request', (request, response) => {
//  the same kind of magic happens here!
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

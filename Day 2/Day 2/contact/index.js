const http = require('http');
const fs = require('fs');
const {parse} = require('querystring');

const port = 5000;
const host = '127.0.0.1';


const server = http.createServer((request, response) =>{
  if (request.method == 'POST') {
    console.log("POST");
    
    var body = '';

    request.on('data',(chunk) => {
        body = body + chunk;
    });

    request.on('end',() => {
        console.log(body);
        body = parse(body);
        console.log(body);

        const data = `
          Name = ${body.name}
          Email = ${body.email}
        `

        fs.appendFile('data.txt', data ,  (err) => {
          if (err) throw err;
          console.log('Saved!');
          
        });
        response.end('info recieved');
    });
}
else if( request.method === "GET" && request.url === "/")
{
    console.log("GET");
    fs.readFile('./contact.html', read = (err,html) => {
      if(err) throw err;
      response.writeHeader(200, {"Content-type":"text/html"});
      response.write(html);
      response.end();
    });
  }
});



server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
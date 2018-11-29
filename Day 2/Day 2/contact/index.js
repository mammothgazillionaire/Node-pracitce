const http = require('http');
const fs = require('fs');
const {parse} = require('querystring');
var url = require('url');



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

        fs.appendFile('data.txt', ` ${JSON.stringify(body)} ` ,  (err) => {
          if (err) throw err;
          console.log('Saved!');
          
        });
    });
    response.end('info recieved');
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
  else if (request.method ==="GET" && request.url === "/list"){
    fs.readFile('./data.txt', read = (err,data) => {
      if(err) throw err;
      response.writeHeader(200, {"Content-type":"text/plain"});
      response.write(data);
      response.end();
    });
  }else if(request.method ==="GET" && request.url === "/list/praveen"){
    fs.readFile('./data.txt', read = (err,data) => {
      var newData =  ''+ data;   
      var splitData = newData.split(' ');
      console.log(splitData);
      var match = /praveen/i;
      var newArr = splitData.filter(d => match.test(d));
      console.log(newArr);
      var parseData = JSON.parse(newArr[0]);
      console.log(parseData);
      let userStr = `Name: ${parseData.name}
                     Email: ${parseData.email}`;
      
      if(err) throw err;
      response.writeHeader(200, {"Content-type":"text/plain"});
      response.write(userStr);
      response.end();
    });
  }else if(request.method ==="GET" && request.url === request.url){
    var q = url.parse(request.url,true);
    var qData = q.query;
    console.log(qData);
    var username = qData.name
    console.log(username);
    
    if(username) {
      fs.readFile('./data.txt', read = (err,data) => {
        var newData =  ''+ data;   
        var splitData = newData.split(' ');
        var match = new RegExp(username, 'i');
        var newArr = splitData.filter(d => match.test(d));
        var parseData = JSON.parse(newArr[0]);
        let userStr = 
        `Name: ${parseData.name}
         Email: ${parseData.email}
        `;
        if(err) throw err;
        response.writeHeader(200, {"Content-type":"text/plain"});
        response.write(userStr);
        response.end();
      });
    }
  }
});



server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
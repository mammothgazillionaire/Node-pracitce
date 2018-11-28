const http = require('http');
const fs = require('fs');
const port = 3300; 

const images = ["1.jpg","1.png","2.png","3.png","4.png"];

// var regex = /"(*?\.(jpg|png))"/ig;

http.createServer((request, response) => {
  if(request.method === 'GET' && request.url === '/'){
    fs.readFile('./home.html', read = (err,html) => {
      if(err){
        throw err;
      };
      response.writeHeader(200, {"Content-type":"text/html"});
      response.write(html);
      response.end();
    });
  } else if(request.method === "GET" && request.url === "/about"){
    fs.readFile('./about.html', read = (err,html) => {
      if(err){
        throw err;
      };
      response.writeHeader(200, {"Content-type":"text/html"});
      response.write(html);
      response.end();
    });
  }else if(request.method === "GET" && request.url === "/projects"){
    fs.readFile('./projects.html', read = (err,html) => {
      if(err){
        throw err;
      };
      response.writeHeader(200, {"Content-type":"text/html"});
      response.write(html);
      response.end();
    }); 
  }
   else{
    for(const image of images) {
      if(request.url === `/${image}`) {
        fs.readFile(`./${image}`, read = (err,html) => {
          if(err){
            throw err;
          };
          response.writeHeader(200, {"Content-Type":"image/jpeg"});
          response.write(html);
          response.end();
        });
      }
    }
  }
}).listen(port, () => console.log(`server is running on localhost::${port}`));
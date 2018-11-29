// const http = require('http');
// const fs = require('fs');
// const port = 3300; 

// const images = ["1.jpg","1.png","2.png","3.png","4.png"];

// // var regex = /"(*?\.(jpg|png))"/ig;

// http.createServer((request, response) => {
//   if(request.method === 'GET' && request.url === '/'){
//     fs.readFile('./home.html', read = (err,html) => {
//       if(err){
//         throw err;
//       };
//       response.writeHeader(200, {"Content-type":"text/html"});
//       response.write(html);
//       response.end();
//     });
//   } else if(request.method === "GET" && request.url === "/about"){
//     fs.readFile('./about.html', read = (err,html) => {
//       if(err){
//         throw err;
//       };
//       response.writeHeader(200, {"Content-type":"text/html"});
//       response.write(html);
//       response.end();
//     });
//   }else if(request.method === "GET" && request.url === "/projects"){
//     fs.readFile('./projects.html', read = (err,html) => {
//       if(err){
//         throw err;
//       };
//       response.writeHeader(200, {"Content-type":"text/html"});
//       response.write(html);
//       response.end();
//     }); 
//   }else if(request.method === "GET" && request.url=== "/contact"){
//     fs.readFile('./contact.html', (err,html) => {
//       if(err) throw err;
//       response.writeHeader(200, {"Content-Type": "text/html"});
//       response.write(html);
//       response.end();
//     })
//   }
//   //  else{
//   //   for(const image of images) {
//   //     if(request.url === `/${image}`) {
//   //       fs.readFile(`./${image}`, read = (err,html) => {
//   //         if(err){
//   //           throw err;
//   //         };
//   //         response.writeHeader(200, {"Content-Type":"image/jpeg"});
//   //         response.write(html);
//   //         response.end();
//   //       });
//   //     }
//   //   }
//   // }
// }).listen(port, () => console.log(`server is running on localhost::${port}`));



// Render all pages dynamically via node server

// DONE - make a server
// handle routes 
    // - home
        // - read ./index.html from fs and then send data via response object
    // - about
    // - projects
    // - contact
    // CSS
    // Images
        // svg
        // jpeg
        // png

const http = require('http');
const fs = require('fs');

function readFileFromSystem(url, contentType, res) {
    fs.readFile(url, (err, data) => {
        if(err) throw err;
        res.writeHeader(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    });
}

function findContentType(ext) {
    switch(ext) {
        case 'svg':
            return 'image/svg+xml';
        case 'png':
            return 'image/png';
        default:
            return 'image/jpeg'
    }
}

const server = http.createServer((req, res) => {
    
    if(req.method === 'GET') {
        switch (req.url) {
            case '/':
                return readFileFromSystem('./home.html', 'text/html', res);
            case '/about':
                return readFileFromSystem('./about.html', 'text/html', res);
            case '/projects':
                return readFileFromSystem('./projects.html', 'text/html', res);
            case '/contact':
                return readFileFromSystem('./contact.html', 'text/html', res);
            case  String(req.url.match(/\/assets\/media\/.*/)):
                const imageStrArr = req.url.split(".");
                const imageNameExt = imageStrArr[imageStrArr.length - 1];
                return readFileFromSystem(`.${req.url}`, findContentType(imageNameExt), res);
            default:
                res.statusCode = 404;
                return res.end('Not Found');
        }
    }
});

server.listen(8000, () => {
    console.log('Server running at 8000');
});



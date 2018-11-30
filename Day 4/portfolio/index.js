const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

function renderFiles(filename,res){
  return res.sendFile(path.join(__dirname+`/${filename}`));

}
app.get('/', (req,res) => {
  renderFiles('views/home.html',res);
});

app.get('/about', (req,res) => {
  renderFiles('views/about.html',res);
});

app.get('/projects', (req,res) => {
  renderFiles('views/projects.html',res);
});

app.get('/contact', (req,res) => {
  renderFiles('views/contact.html',res);
});

app.post('/contact', (req,res) => {
   fs.readFile('./data.json', (err ,data) => {
    data = JSON.parse(data);
    data.contacts.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data) , (err)=> {
      if(err) throw err;
    })
   });  
    res.send("<h1>submmited</h1>");
  })



app.listen(port, () => console.log(`listening on port ${port}`));
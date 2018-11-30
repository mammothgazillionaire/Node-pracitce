const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');

app.use(express.static('./images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

function renderFiles(filename,res){
  return res.sendFile(path.join(__dirname+`/${filename}`));

}
app.get('/', (req,res) => {
  renderFiles('home.html',res);
});

app.get('/about', (req,res) => {
  renderFiles('about.html',res);
});

app.get('/projects', (req,res) => {
  renderFiles('projects.html',res);
});

app.get('/contact', (req,res) => {
  renderFiles('contact.html',res);
});

app.post('/contact', (req,res) => {
  console.log(req.body)
  res.send(req.body);
})



app.listen(port, () => console.log(`listening on port ${port}`));
const express = require('express');
const app = express();
const port = 4400;
const fs = require("fs");
const mongoose = require( 'mongoose' );
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('./methodOverride')();
// const methodOverride = require('method-override');

mongoose.connect( 'mongodb://localhost/todo', (err,connection) => {
  if(err) throw err;
  else console.log("connected to mongodb");
});

const Schema  = mongoose.Schema;
 
var TodoSchema = new Schema({
    todo : String,
    done: Boolean,
    description: String
});
 
const Todo = mongoose.model( 'Todo', TodoSchema );

app.set('views', './views');
app.set('view engine', 'ejs');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// middleware method Override

app.use((req,res,next) => {
  
  switch(req.body._method){
    case 'PUT':
        req.method = 'PUT';
        next(); 
        break;       
    case 'DELETE':
      req.method = 'DELETE';
      next();
      break;
    default:
      return next();
  }
})


// app.use(methodOverride(function (req, res) {
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     // look in urlencoded POST bodies and delete it
//     console.log(req.body);
//     var method = req.body._method
//     console.log(method);
//     delete req.body._method
//     return method
//   }
// }));

app.use(methodOverride('_method'));

// logger
app.use((req,res,next) => {
  let logger = `METHOD is ${req.method} PATH is ${req.url} created on ${new Date()}\n`;
  fs.appendFile('error.log', logger ,(err, logSucess) => {
    if(err) throw err;
    next();
  })
})



app.get('/',(req, res) => {
  Todo.find({},(err,data)=>{
    res.render('index', {todos:data});
  })
});


app.post('/',(req,res)=> {
  console.log(req.body);
  let item = req.body;
  item.done = false;
  let todo = new Todo(item);
  console.log(todo);
  

  todo.save((err,data)=> {
    console.log(data);
    res.redirect('/')
  })
});


app.get('/todos/:id',(req, res) => {
  Todo.find({_id: req.params.id},(err,todo)=>{
  console.log(todo);
  res.render('todo', {todo});
  })
});

// update


app.get("/todos/:id/edit",(req, res) => {
  const id = req.params.id;
  Todo.find({_id : id}, (err, data) => {
    res.render('edit', {todo : data})
  });
});

app.put(("/todos/:id"),(req, res) => {
  const id = req.params.id;
  let data = req.body;
  Todo.updateOne({ _id: id },{$set : {...data}},(err,data) =>{
    if(err) throw err;
    res.redirect('/');
  })
});

// delete

app.delete("/todos/:id/delete",(req, res) => {
  // find data
  Todo.remove({ _id: req.params.id }, (err, todo) => {
      res.redirect('/');
  });
});


// app.get('*',(req, res) => {
//   res.render('<h2>Page Not Found</h2>');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
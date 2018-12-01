const express = require('express');
const app = express();
const port = 4400;
const fs = require("fs");
const mongoose = require( 'mongoose' );
const bodyParser = require('body-parser');
const path = require('path');

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

app.get('/todos/:id',(req, res) => {
  Todo.find({_id: req.params.id},(err,todo)=>{
  console.log(todo);
  res.render('todo', {todo});
  })
});

// update


app.route("/todos/:id/edit").get((req, res) => {
  Todo.find({_id : req.params.id}, (err, data) => {
    res.render('edit', {todo : data});
  })
})
.post((req, res) => {
  const id = req.params.id;
  console.log(id);
  let data = req.body;
  console.log(data, "<= data")
  Todo.update({_id : id}, {$set : {...data}}, (err, data) => {
    res.redirect('/')
  })
  
});


// app.route("/todos/:id/edit").get((req, res) => {
//   res.render('edit');
// }).put((req, res) => {
//   // find data
//   Todo.findByIdAndUpdate({ _id: req.params.id }, (err, todo) => {
//     todo.todo = todo;
//     todo.save((err, updatedData) => {
//       res.render('edit',updatedData);
//     });
//   });
// });

// delete


app.get("/todos/:id/delete",(req, res) => {
  const id = req.params.id;
  Todo.remove({_id : id}, (err) => {
    res.redirect('/')
  })
});

// app.delete("/todos/:id/delete",(req, res) => {
//   // find data
//   Todo.findByIdAndDelete({ _id: req.params.id }, (err, todo) => {
//     todo.remove((err, updatedData) => {
//       res.render('index',updatedData);
//     });
//   });
// });

app.post('/',(req,res)=> {
  console.log(req.body);
  
  let item = req.body;
  item.done = false;
  let todo = new Todo(item);
  // const { content, done } = req.body;
  // let todo = new Todo({content, done});
  console.log(todo);
  

  todo.save((err,data)=> {
    console.log(data);
    res.redirect('/')
  })
});

// app.get('*',(req, res) => {
//   res.render('<h2>Page Not Found</h2>');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
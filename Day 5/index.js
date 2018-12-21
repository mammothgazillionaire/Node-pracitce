const express = require('express')
const app = express();
const port = 3000;
// require lodash
const _ = require("lodash");

// const fp = require('lodash/fp');



// using array methods lodash
var array = require('lodash/fp/array');
// using object methods lodash
var object = require('lodash/object');

var arr = [1,2,4];

var concatArr = _.concat(arr,[[2],[2,4,5,6,[2,4,5,6]]],3);


app.get('/', (req, res) => res.send(concatArr));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

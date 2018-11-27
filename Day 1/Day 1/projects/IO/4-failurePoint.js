// Mixing Blocking and Non-blocking - Oops code!
const fs = require('fs');
// fs.readFile('/file.md', (err, data) => {
//   if (err) throw err;
//    console.log(data);
// });

const readInSync = fs.readFile('./file2.md');
console.log(readInSync);

// findout what fs.unlinkSync and fs.unlink does?
fs.unlink('./file2.md',() => {
});

// Entirely Non-blocking - Good code!
// const fs = require('fs');
// fs.readFile('/file.md', (readFileErr, data) => {
//   if (readFileErr) throw readFileErr;
//   console.log(data);
//   fs.unlink('/file.md', (unlinkErr) => {
//     if (unlinkErr) throw unlinkErr;
//   });
// });
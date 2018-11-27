// console.log("Hello World!");

// Try doing 
// console.log(document);
// console.log(window);
// console.log(process);
// console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV == "development"){
console.log("i m development");
}else if(process.env.NODE_ENV == "production"){
  console.log("i m in production");
}

console.log(process.env.API_KEY);
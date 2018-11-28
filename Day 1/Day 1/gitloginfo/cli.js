#!/usr/bin/env node

const readline = require('readline');
const https = require('https');

const r1 = readline.createInterface({
input: process.stdin,
output: process.stdout
});

let data = '';

r1.question('Enter username?' , (username) => {
  https.get({
    host: 'api.github.com',
    path: '/users/' + username,
    method: 'GET',
    headers: {'user-agent': 'node.js'}
  }, (response) => {
 
  response.on('data',(chunk) => {
    data = data + chunk;
  });
  response.on('end', () => {
    const jsonData = JSON.parse(data);
    console.log('login:' , jsonData.login);
    console.log('Repos:', jsonData.public_repos);
    console.log('followers', jsonData.followers);
  });

}).on('error' , (err) => {
  console.log('Error', + err.message);
})
  r1.close();
});


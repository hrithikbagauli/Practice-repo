console.log('Hello world');

const fs = require('fs');
fs.writeFileSync('hello.txt', 'hello world!');

//the file hello.txt gets created in the folder where vs code was opened.
//question 1 - we use express js to make it easier for ourselves to write code. With node js we had to write a lot of code for even basic things like extracting data from a request or writing the logic for different routes etc.
//question 3 - middlewares are functions that have access to the request and response objects and a next function. It allows us to do work with requests and send a response. Also, the next function allows us to move to the next middleware.
//question 4 - next is a function that allows us to move to the next middleware. if we don't use next(), nodejs won't be able to move on the next middleware and request would die. So, we either have to return a response or provide a next() function.
//question 5 - res.send() allows us to send a response.
//question 6 - the content-type is detected automatically by expressjs and it'll be set to 'text/html' since we're sending a string.
//question 7 - there will be no content type in the header.
//question 8 - app.listen() calls http.createServer() and passes itself so its basically the same as importing the server, then calling the createServer() method and passing a request listener and then finally calling the listen method on the server. It's better because its reduces the lines of code.



// const http = require('http'); replaced by app.listen();

const express = require('express');

const app = express(); //the express package we imported in the line above exports a function and that's why we've written express(). This function will initialise a new object where expressjs will store and manage a lot of things for us so a lot of logic is present in this app variable.

app.use((req, res, next)=>{ //use() is a method provided by expressjs that lets us add a middleware. Here, the arrow function we're passing is the middleware function, which will be exectued for every incoming request. req and res are the request and response objects as we used earlier. next is a function that lets us move to another middleware function. without next(), the code will not move to the next middleware function.
    // console.log('in the first middleware');
    next();
});

app.use((req, res, next)=>{ //use() is a method provided by expressjs that lets us add a middleware. Here, the arrow function we're passing is the middleware function, which will be exectued for every incoming request. req and res are the request and response objects as we used earlier. next is a function that lets us move to another middleware function. without next(), the code will not move to the next middleware function and the request will die. So, we either have to provide a next() function or return a response.
    // console.log('in the second middleware');
    res.send('<h1>{key:value}</h1>'); //with express, we can easily send a response like this and we don't even need to use res.setHeader('Content-Type', 'text/html') to set the content type as 'text/html'. the content type is automatically detected by express js.
});

// const server = http.createServer(app); //app is also a request handler, so we can use it like we used a request listener function earlier but so far we've not defined the logic for what to do for an incoming request.
// server.listen(4000); //replaced by app.listen()

app.listen(4000); //instead of importing http and then using createServer() and then making that server listen to a port, we can directly write app.listen(portname) because the listen() method implemented by express js(as seen in the source code of express js) already imports http and creates a server behind the scenes. This makes it easier for us to write a cleaner code.
//this is a cleaner way of writing the code. We're separating the routing logic from this file.

const http = require('http');
const routes = require('./routes'); //since routes.js is not a global module, we'll need to mention the path of routes.js .this will check for a local file called routes.js and it'll then look for the value assigned to module.exports . So, on this line, we're basically importing the requestHandler function we created in routes.js and putting it inside app.js

const server = http.createServer(routes); //here, we didn't write routes() even though it holds the requestHandler function because createServer will automatically execute it for incoming requests.

// const server = http.createServer(routes.handler); //this is the syntax when we export an object inside module.exports
// console.log(routes.text); //accessing the value of text attribute of the object.

server.listen(4000);
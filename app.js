const http = require('http');

//we can create a separate request listener function or we can create an anonymous request listener function inside the createServer() method itself.
// function reqlistener(req, res){//the request listener function takes two arguments i.e. a request object and a response object. The request object lets us read data from the request and the response object lets us respond to the user who sends the request.

// }

// http.createServer(reqlistener); //not using () here because we don't want to call it rightaway. We're simply telling the createServer() method to look for the method with name "reqlistener" and execute it for every incoming request.

//createServer() waits for a request to come and when it does, it calls the request listener function.
//node js has a very event driven structure, i.e. if this happens, do that. Like an event listener. createServer() works on the same principle, it says "if a request comes, please execute this function i.e. reqlistener"

//Anonymous request listener function.
// http.createServer(function(req, res){

// })

//createServer() is a callback function as node js calls it whenever there's an incoming request.
//arrow function for request listener
const server = http.createServer((req, res)=>{ //createServer() returns a server, so storing that server into a variable so that we can reuse it whenever we want. Using a const because we don't wanna change the server.
    console.log(req);
})

server.listen(3000); //this method is what actually tells node js to listen for incoming requests and not exit the code immediately after going through the code.
//listen() also takes some optional arguments like port(which is usually port 80 by default in production but since we're learning things, we can change it here). we can also have a hostname which by default is the name of the machine the code is running in. so for our machine it'll be 'localhost'.
//3000 is a commonly used port for experimenting. we can use other ports also which aren't being used for anything. The ports in the 1000 range are usually safe to use.


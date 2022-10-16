// 1)

// node js is an event driven architecture because the functions wait for an event to trigger them. e.g. node js waits for an incoming request to call the createServer() method.

// 2)

// node js does so by executing code only when a certain event occurs. It does not wait for a request to complete and then move on to other tasks but it simply runs the code only when an event triggers it. This lets node js handle many requests at once.

// 3)

// since a server runs continuously and waits for a request to come. Sometimes, we might need to stop the server from listening and make node js exit the code, that's when we use process.exit(). It force exits node js.

// 4)

// req.url contains the url, req.header contains information about the header, req.method tells us which method is being used.



const http = require('http');

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method, req.headers); //getting the url, method and header information using the request object.
    res.setHeader('Content-Type', 'text/html'); //setting the value for content type key to 'text/html'. text/html tells the browser that the content in the response is going to be of type html. Browser only understands certain values for headers.
    //since we set the content type to html in the line above. now we need to actually pass the html code and we do that using write().
    res.write('<html>'); //write() allows us to write data to the response line by line and that's why we've used so many write() methods below but its obviously not a feasible way of writing code so we'll learn a better way of doing it.
    res.write('<head><title>my first page</title></head>');
    res.write('<body><h1>welcome to my node js project!</h1></body>');
    res.write('</html>');
    res.end(); //we also need to tell node js that the response ends here.
});
// process.exit();
server.listen(4000);
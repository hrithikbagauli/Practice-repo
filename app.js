//an incoming request is read in chunks by nodejs and in the end at some point of time its done reading everything. This is done so that we can start working on the individual chunks without having to wait for the entire thing to finish reading. for simple requests with very little content, it might not be required because it won't take long to parse that but if we upload an entire file. Now, that'll take a considerable amount of time and here, streaming the data makes sense because it'll allow us to start writing the data to our hard drive where node js app runs on the server.
//So, we can start writing while the data is still coming in and this way we don't have to wait the entire file to be parsed and then start writing the data to our hard drive.
//but node js does this regardless of the size of data because it doesn't know how big the data is.
//since the data is coming in continuously, we can't just randomly try to work with these chunks with our code, we require something to organize these chunks and that is exactly what a buffer does.
//a buffer is a structure that allows us to hold multiple chunks and work with them.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    
    if(url==='/'){ //=== checks if the url is a string and also has the correct value i.e. '/' in this case.
        res.write('<html>');
        res.write('<head><title>enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>') //here, the request that is automatically generated for the post request is directly sent to the url mentioned in form action, which in this case is '/message' which basically means 'localhost:4000/message'.we're using post as the method here because we want to send data to another url. so this will send a post request to the mentioned url and it'll also send the data present in the input fields and put it into the request body as key value pairs where names of the input fields are the keys and the data entered by the user are the values for those keys.
        res.write('</html>');
        return res.end(); //using return here so that the code below doesn't get executed when this if condition runs.
    }
    //before sending the response and before writing to the file we need to get the request data.
    if(url==='/message' && method==='POST'){
        const request_body = []; //creating an array which will store the data from the request.
        //on is an event listener that allows us to listen for certain events, one of those events is the data event. The data event will be triggered whenever a new chunk is ready to be read.
        req.on('data', (chunk)=>{ //here we receive a chunk so now we can work with it. req.on() takes the 2nd argument as a function which contains chunk as its parameter and the function defines what to do with this chunk.
            console.log(chunk); //just logging the value here to see how many times this method is called and what's inside this chunk.
            request_body.push(chunk); //the req.on() will be called again and again until there's no data left to parse from the request.
        });
        req.on('end', ()=>{
            //now we have all the chunks in the array but its present in a weird format, so in order to use them, we'll need a buffer.
            const parsedBody = Buffer.concat(request_body).toString(); //the Buffer object comes with node js and here we're just adding all the chunks that were stored in the array to the buffer so that we can use them and then we're finally converting the data to a string because the data is present in the buffer in a weird format(you can log the chunks and see it for yourself) so we have to convert it to a string. Also, we're using toString() here because we know that the input will be in text format. if it were in some other format such as a file, we'll have to use something else.
            const message = parsedBody.split('=')[1]; //as we learnt earlier that a post request attaches the data from input fields in the request body in the form of key value pairs where name is the key and value is the data entered by user. This is why when we just print parsedBody it prints "message=helloooo" because message is the name and the value entered for it was helloooo.
            // console.log(request_body); //logging the request_body to that the data is present in array in a weird format so we can't use it directly from here and this is why we need a buffer.
            fs.writeFileSync('message.txt', message); //creating a new file called message.txt with content as 'dummy data'.
        }); //this event will be fired when node js is done parsing the incoming requests. This method also contains a function which defines what to do when the incoming request has been parsed completely and all the chunks have been stored in the request_body array we created earlier.
        res.statusCode = 302;   //setting the status code as 302 because its the status code for redirection.
        res.setHeader('Location', '/'); //setting the header's location to '/' so that it redirects the page to '/' which is the root directory.
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>message page</title></head>');
    res.write('<body><h1>welcome to my node js server!</h1></body>')
    res.write('</html>');
    return res.end();
});

server.listen(4000);
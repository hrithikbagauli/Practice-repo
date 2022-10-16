const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    
    if(url==='/'){ //=== checks if the url is a string and also has the correct value i.e. '/' in this case.
        res.write('<html>');
        res.write('<head><title>enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>') //here, the request that is automatically generated for the post request is directly sent to the url mentioned in form action, which in this case is '/message' which basically means 'localhost:4000/message'.we're using post as the method here because we want to send data to another url. so this will send a post request to the mentioned url and it'll also look into the input fields and check if there's any input. The name given to input is later used a key to access the input.
        res.write('</html>');
        return res.end(); //using return here so that the code below doesn't get executed when this if condition runs.
    }
    if(url==='/message' && method==='POST'){
        fs.writeFileSync('message.txt', 'dummy data'); //creating a new file called message.txt with content as 'dummy data'.
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
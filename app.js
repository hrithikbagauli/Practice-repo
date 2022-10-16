//writeFileSync() vs writeFile(). writeFileSync() means write file synchronously whereas writeFile() works asynchronously. writeFile() takes an extra arguments i.e. a callback function that is called when nodejs has finished writing the data to the file. node js doesn't wait for writeFile() and moves on to execute the next line of code. When node js is done writing to the file, it'll then run the code present inside the callback function. On the other hand writefileSync() makes node js wait for it to finish writing to the file and only after its finished can nodejs move on to the next line. This can waste valuable time when there's a lot of data to be written so instead of waiting for the file to finish writing its better to use writeFile() because it doesn't wait for anything and calls the function only when node js has finished writing the code.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    
    if(url==='/'){ 
        res.write('<html>');
        res.write('<head><title>enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>') //here, the request that is automatically generated for the post request is directly sent to the url mentioned in form action, which in this case is '/message' which basically means 'localhost:4000/message'.we're using post as the method here because we want to send data to another url. so this will send a post request to the mentioned url and it'll also send the data present in the input fields and put it into the request body as key value pairs where names of the input fields are the keys and the data entered by the user are the values for those keys.
        res.write('</html>');
        return res.end(); 
    }
    
    if(url==='/message' && method==='POST'){
        const request_body = []; 
        
        req.on('data', (chunk)=>{ 
            console.log(chunk); 
            request_body.push(chunk); 
        });
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(request_body).toString(); 
            const message = parsedBody.split('=')[1]; 
            fs.writeFile('message.txt', message, err=>{ // the code inside this block will run only after node js has finished writing to the file i.e. message.txt in this case. We had to move the code for response inside this block because we want to redirect to he root page after the file has been written. Otherwise
                res.statusCode = 302;  
                res.setHeader('Location', '/'); 
                return res.end();
            });
        });  
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>message page</title></head>');
    res.write('<body><h1>welcome to my node js server!</h1></body>')
    res.write('</html>');
    return res.end();
});

server.listen(4000);
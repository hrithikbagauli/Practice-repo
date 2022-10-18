const fs = require('fs');

const requestHandler = (req, res) =>{ //creating this method to handler the request and response because this function will act as the request listener function in app.js and this is also the reason this function has to be exported.
    const url = req.url;
    const method = req.method;

    if(url==='/'){ 
        res.write('<html>');
        res.write('<head><title>enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>') 
        res.write('</html>');
        return res.end(); 
    }
    
    if(url==='/message' && method==='POST'){
        const request_body = []; 
        req.on('data', (chunk)=>{  
            request_body.push(chunk);
        });
        req.on('end', ()=>{
            const parsedBody = Buffer.concat(request_body).toString();
            const message = parsedBody.split('=')[1]; 
            fs.writeFileSync('message.txt', message);
        }); 
        res.statusCode = 302;   
        res.setHeader('Location', '/'); 
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>message page</title></head>');
    res.write('<body><h1>welcome to my node js server!</h1></body>')
    res.write('</html>');
    return res.end();
}


//module.exports is a keyword or object that is exposed globally in nodejs and we're going to use it to export out requestHandler function.
//there are multiple ways of exporting our requestHandler. Some of the ways are as follows:-
module.exports = requestHandler; //here, we've assigned requestHandler to module.exports and since module.exports is globally exposed, we'll now be able to import it using require() in the app.js file.
    
module.exports = { //we can also pass an object to module.exports
    handler: requestHandler,
    somerandomtext: 'some text'
}

//another way of exporting:-
module.exports.handler = requestHandler;
module.exports.somerandomtext = 'some text';

//another shorter way of exporting:-
exports.handler = requestHandler;
exports.somerandomtext = 'some text';
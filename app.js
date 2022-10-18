const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;

    if(url==='/'){
        fs.readFile('message.txt', {encoding: 'utf-8'}, (err,data)=>{
            res.write('<html>');
            res.write('<head><title>my page</title></head>');
            res.write(`<body>${data}</body>`)
            res.write('<body><form action="/senddata" method="POST"><input type="text" name="msg"><button type="submit">send</button></form></body>');
            res.write('</html>');
            return res.end();
        });
    }
    else if(url==='/senddata' && method==='POST'){
        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
        });
        return req.on('end',()=>{
            const message = Buffer.concat(body).toString().split('=')[1];
            fs.writeFile('message.txt', message, ()=>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
    }
});
server.listen(4000);


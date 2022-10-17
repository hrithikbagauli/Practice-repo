// Question 1 - 

// const http = require('http');
// const fs = require('fs');
// const server = http.createServer((req, res)=>{
//     const url = req.url;
//     const method = req.method;

//     if(url==='/'){
//         res.write('<html>');
//         res.write('<head><title>testing page</title></head>');
//         res.write('<body><form action="/message" method="POST"><input type = "text" name="msg"><button type="submit">send</button></form></body>')
//         res.write('</html>');
//     }
//     else if(url==='/message' && method==='POST'){
//         const body = [];
//         req.on('data',(chunk)=>{
//             body.push(chunk);
//         });
//         req.on('end',()=>{
//             const parsedbody = Buffer.concat(body).toString();
//             const message = parsedbody.split('=')[1];
//             fs.writeFileSync('message.txt', message);
//         })
//         res.statusCode = 302;
//         res.setHeader('Location', '/');
//     }
//     res.end();
// });

// server.listen(4000);

// Question 2 - 
//A stream is useful when we want to write a big amount of data to a file. A stream let's us start writing data to a file as the data is coming in from the request. This way we don't have to wait for node js to finish parsing the entire data.
//A buffer is a structure which allows us to work with the chunks of data coming in from a request. Since the data comes in continuously, we can't just randomly start working with it. This is why we need a buffer. A buffer takes the chunks of data in an organized format, allowing us to work with it.


//Question 3 - 

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;

    if(url==='/'){
        const readfile = fs.readFileSync('message.txt').toString();
        res.write('<html>');
        res.write('<head><title>my page</title></head>');
        res.write(`<body>${readfile}</body>`)
        res.write('<body><form action="/senddata" method="POST"><input type="text" name="msg"><button type="submit">send</button></form></body>');
        res.write('</html>');
    }
    else if(url==='/senddata' && method==='POST'){
        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const message = Buffer.concat(body).toString().split('=')[1];
            console.log(message);
            fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location','/');
    }
    res.end();
});

server.listen(4000);
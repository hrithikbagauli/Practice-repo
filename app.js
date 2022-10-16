const http = require('http');
//deliverable no. 1
// const server = http.createServer((req, res)=>{
//     res.setHeader('Content-Type', 'text/html');
    // res.write('<html>');
    // res.write('<head><title>my page</title></head>');
    // res.write('<body><h1>Welcome to my Node JS project!</h1> </body>')
    // res.write('</html>');
    // res.end();
// });

//deliverable no. 2
const server = http.createServer((req,res)=>{
    const url = req.url;
    if(url=='/home'){
        res.write('<html>');
        res.write('<head><title>my page</title></head>');
        res.write('<body><h1>Welcome home!</h1> </body>')
        res.write('</html>');
    }
    else if(url=='/about'){
        res.write('<html>');
        res.write('<head><title>my page</title></head>');
        res.write('<body><h1>Welcome to about us!</h1> </body>')
        res.write('</html>');
    }
    else if(url=='/node'){
        res.write('<html>');
        res.write('<head><title>my page</title></head>');
        res.write('<body><h1>Welcome to my Node JS project!</h1> </body>')
        res.write('</html>');
    }
    res.end();
});

server.listen(4000);
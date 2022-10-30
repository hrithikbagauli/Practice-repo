const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const fs = require('fs');

app.use(bodyparser.urlencoded({extended:false}));

app.post('/', (req, res, next)=>{
    fs.writeFile('message.txt', `${req.body.username} : ${req.body.message} `, {flag: 'a'}, (err)=>{ //flag: 'a' sets the file mode to 'append' which means any new data will be appended to the existing data and not replace the previous data. The default mode is to replace the data when you write in a file.
        err? console.log(err):res.redirect('/');
    })
})

app.get('/', (req, res, next)=>{
    fs.readFile('message.txt', {encoding: 'utf-8'}, (err, data)=>{//data is the data that has been read from the file.
        if(err){//an error will occur if there's no data to read. So, we're using that for a condition. In case of an error, set the value of data to 'no chats exist'
           data = 'no chats exist';
        }
        //creating a hidden input field so that it doesn't appear on the webpage. This is just a dummy input field.
        //taking the value from the hidden dummy field and setting its value to the username stored in the localstorage.
        res.send(`${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')"> 
        <input type="text" name="message" placeholder="write a message">
        <input type="hidden" name="username" id="username"> 
        <button type="submit">send message</button>
        </form>`);
    });
});

//onsubmit decides what happens when the form is submitted.
app.get('/login', (req, res, next)=>{
    res.send(`<form action="/" onsubmit="localStorage.setItem('username', document.getElementById('username').value)"> 
    <input type="text" id="username" name="username" placeholder="username"><br>
    <button type="submit">login</button>
    </form>`);
})

app.listen(4000);
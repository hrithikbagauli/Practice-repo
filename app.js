const express = require('express');
const adminRoutes = require('./routes/admin'); 
const shopRoutes = require('./routes/shop');  
const path = require('path');
const bodyparser = require('body-parser'); 
const app = express(); 

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))); //we use this middleware to allow us to send files statically. Normally, express looks for the url we enter in the browser in the routes folder but since our css files are present inside the public folder and since its not part of the routes, we'll get an error if we try to access it normally. That is why we need this middleware. 
app.use(adminRoutes); 
app.use(shopRoutes);

app.use((req, res, next)=>{ 
    res.status(404).sendFile(
        path.join(__dirname, 'views', 'notfound.html')
    )
})

app.listen(4000); 
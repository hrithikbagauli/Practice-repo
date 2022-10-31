const express = require('express');
const adminRoutes = require('./routes/admin'); 
const shopRoutes = require('./routes/shop');  
const path = require('path');

const bodyparser = require('body-parser'); 

const app = express(); 

app.use(bodyparser.urlencoded({extended: false}));

app.use(adminRoutes); 
app.use(shopRoutes);

app.use((req, res, next)=>{ 
    res.status(404).sendFile(
        path.join(__dirname, 'views', 'notfound.html')
    )
})

app.listen(4000); 
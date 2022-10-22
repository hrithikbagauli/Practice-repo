const express = require('express');
//we've created two different files to handle routes, admin.js and shop.js because we want some things to be only accessible to the admin and not the users. So, shop.js is going to handle the data that is visible to the user and admin.js handles data that is visible only to the admin. admin.js does have a '/addproduct' page which will be visible to the users but it uses a get request so that the users can see and fill the form but what happens with the submitted data will all be taken care of in the backend and that's why we've kept it in a separate file.
const adminRoutes = require('./routes/admin'); //importing router from admin.js
const shopRoutes = require('./routes/shop');  //importing router from shop.js

const bodyparser = require('body-parser'); 

const app = express(); 

app.use(bodyparser.urlencoded({extended: false}));

app.use('/admin', adminRoutes); //router is basically a middleware function so we can directly use it like this. Also, the first argument here is a filter that allows us to put a common starting segment for all urls inside admin.js which basically means that all the routes inside admin.js will start with '/admin' and the benefit of this is that we don't have to modify all the routes one by one.

app.use('/shop', shopRoutes); 

app.use((req, res, next)=>{ //adding another middleware to handle the situation if the page doesn't exist.
    res.status(404).send( //status() lets us set the status code.
        '<h1>Page not found</h1>'
    )
})

app.listen(4000); 











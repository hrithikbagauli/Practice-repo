const express = require('express');

const app = express(); 

//app.use() takes path as an optional argument, by default the path is '/'. 
app.use('/',(req, res, next)=>{ //we've kept this middleware at the top of others because we want this middleware to be executed for every other middleware. We know that node js reads the middlewares in a specific order i.e. from top to bottom. So, this is how its going to work :- first, this middleware will be executed and since we've mentioned the path as '/' which means it'll check if the path on the browser starts with a '/' and obviously, every web address starts with a slash so it'll be executed for every web address. Also, we've used a next() method inside which will make sure that after this middleware, the control will move to the next middleware. And since we're returning a response in the other two middlewares, first the control will move to the next middleware and after a response is sent from that middleware, the control will again come back to this middleware and then because of the next() method, the control will now go to the third middleware. 
    console.log('this runs for every request');
    next();
});

app.use('/addproduct',(req, res, next)=>{
    console.log('inside a middleware');
    res.send('<h1> add product </h1>');
});

app.use('/',(req, res, next)=>{ 
    console.log('inside second middleware');
    res.send('<h1> home page </h1>');
});

app.listen(4000); 











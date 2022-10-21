//question 2 - even though express provides us a convenient way of accessing the request body, it doesn't parse the request body by default. So, we need to install a third party package called body-parser to parse the request body.

const express = require('express');
const bodyparser = require('body-parser'); //importing body-parser package

const app = express(); 

app.use(bodyparser.urlencoded({extended: false})); //we have to call the urlencoded() method using the bodyparser object. urlencoded() will create a middleware(happens behind the scenes so we don't see it) for parsing request body and it also has a next() method so that the request also reaches our middlewares. {extended:false} is just to comply with some rules, if we don't follow it we get a warning.

app.use('/addproduct',(req, res, next)=>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"><select name="size"><option>small</option><option>medium</option><option>large</option></select><button type="submit">add product</button></form>');
});
app.post('/product', (req, res, next)=>{ // app.use() will execute for both get and post requests, but if we want a particular middleware to execute only for a specific type of request i.e. get or post then we can use app.get() or app.post(). they're both the same as app.use() but the only difference is that app.get() will only get executed for a get request and app.post() only for post requests.
    console.log(req.body); //express provides us another convenient property of accessing the request's body but it doesn't try to parse the incoming body request by default and that's why it shows undefined when we try to print the request body without parsing. So, for parsing the request body, we need to install another third party package called body-parser.
    console.log(req.body.title); //using the name we provided in the input field in the form to access the properties of the object.
    console.log(req.body.size);
    res.redirect('/'); //redirects to the mentioned page. Here, express makes it easy to redirect to another page because earlier we had to change to status code and set header to redirect but now we can do it simply using the redirect() method provided by express.
});

app.use('/',(req, res, next)=>{ 
    res.send('<h1> home page </h1>');
});

app.listen(4000); 











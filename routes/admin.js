const express = require('express'); 
const router = express.Router();  
const path = require('path'); 
const rootdir = require('../util/path') //importing the path we got in path.js

router.get('/addproduct',(req, res, next)=>{
    res.sendFile(path.join(rootdir, 'views', 'addproduct.html')); //using the path we got in path.js .The benefit of using this is that it works on every Operating system.
});

module.exports = router;

const express = require('express'); 
const router = express.Router();  
const path = require('path'); //importing the path module to work with paths. 

router.get('/addproduct',(req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'addproduct.html')); //sendFile() allows us to send html pages. We've used path.join() because we cannot directly specify the location of the file we want to send using just '/' or './' because sendFile() assumes that by '/' we mean the root folder of our computer and not the file we're working on. So, we need to specify the absolute path including the computer's root directory. This is what path.join() helps us with. It basically joins the multiple path segments into one and returns one whole path.Here,  __dirname refers to the absolute path of our computer. After __dirname, we have another argument i.e. '../' and here we're telling nodejs to get out of the current folder because we've used sendFile() inside 'admin.js', path will currently point to the 'routes' folder but since our 'views' folder is outside, we need to get out of the 'routes' folder first and that's why we've used '../' here. If we didn't want to get out of the folder, we could've just omitted this argument. In the third argument, since we're out of the 'routes' folder now, here we're specifying which folder to go to i.e. go inside the 'views' folder. Finally, the last argument is the name of the html page.
    //path.join() basically combines all the paths we've specified and returns one path. e.g. for this case, it returns this :- D:\CODES\sharpenerProjects\GitStart\nodejs\views\shop.html
    //instead of using '../' we can also use '..' and it'll do the same thing.
});

module.exports = router;

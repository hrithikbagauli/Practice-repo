const express = require('express'); //importing express 
const router = express.Router();    //this is how we create a router. This router will allow us to set the logic for each route.

router.get('/addproduct',(req, res, next)=>{
    res.send('<form action="/admin/addproduct" method="POST"><input type="text" name="title"><select name="size"><option>small</option><option>medium</option><option>large</option></select><button type="submit">add product</button></form>');
});
router.post('/addproduct', (req, res, next)=>{ //here, we've used the same path as above because we're using post method here. So, as long as the methods are different we can use the same name for different routes.
    console.log(req.body); 
    console.log(req.body.title); 
    console.log(req.body.size);
    res.redirect('/'); 
});

module.exports = router;


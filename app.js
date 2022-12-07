const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user; //user is a new field we're adding to our req object. Its similar to req.body but req.user will be undefined as it doesn't exist by default.
        next();
    })
    .catch(err=>console.log(err))
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'}) //here, we're defining a relation between the user model and the product model we imported above. here, we're saying that a Product belongs to a user and by belongs, we're talking about the user who created that product. In the second argument(optional), we've defined how this relationship between product and user can be managed. onDelete: 'cascade' means that if the user is deleted, then any related products will get deleted as well.
User.hasMany(Product); //a user may have multiple products.

sequelize
//.sync({force: true}) //sync() basically creates tables for us. It is aware of the properties we've defined for our product model and based on that information, it'll create a table in the database. {force: true} is an optional argument that decides whether to delete the table if it already exists in the database and create a new one. Since its set to true here, if the table exists, it'll be deleted and a new table will be created.
.sync()
.then(result=>{
    return User.findByPk(1);
})
.then(user=>{
    if(!user){
        return User.create({name: 'Max', email: 'test@test.com'});
    }
    //return Promise.resolve(user);  Promise.resolve() ensures that the same type of data is being returned. Since, in the above if block we're returning a promise, we should return data of the same type in other places as well in this then() block.
    return user; //i've commented out the above line since we're returning the user inside a then() block and anything that is being returned from a then() block is automatically wrapped inside a promise so we don't need to use Promise.resolve() here.
})
.then(user=>{
    // console.log(user);
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
});


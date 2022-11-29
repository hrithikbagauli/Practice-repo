const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product
  .create({//create() is a method provided by sequelize that creates an element based on the model(product model in this case) and immediately saves it to the database. build() is another method that does the same thing but with that, the element has to be saved manually and that's why we've used create() because it does both for us.  
    title: title, //the one on the left refers to the attribute we defined in the product model and the one on the right refers to the 'const title = req.body.title' above. Same is true for the ones below.
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result=>{
    res.redirect('/admin/products');
  })
  .catch(err=>{
    console.log(err);
  })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product=>{
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err=>{
    console.log(err);
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
  .then(product=>{
    product.title = updatedTitle;//changing the value of the retrieved product. Doing the same below.
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    return product.save(); //Saving the changes to the database. save() method comes with sequelize that saves the data in the database. If the product exists, it'll update the database, otherwise it'll create a new product in the database. We're using this method here because in the few lines above we're updating the product we retrieved but those changes exist only inside this file, so in order to change the data in the database as well, we need to use save().
  })
  .then(result=>{
    res.redirect('/admin/products');
    console.log('Product updated!'); //this then() is to deal with whatever response comes after save() method.
  })
  .catch(err=>console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(
    products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    }
  ).catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product=>{
    return product.destroy(); //destroy() method comes with sequelize and is used to delete an item from the database. product refers to the retrieved product and product.destroy() means delete the retrieved product from the database.
  })
  .then(result=>{
    console.log('Product deleted!');
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
};

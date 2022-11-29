const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then( //findALl() is a method that comes with sequelize.
    products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    }
  ).catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId}}).then(
    products=>{
      res.render('shop/product-detail', {
        product: products[0], //products[0] because findById() returns an array but product-detail.ejs expects a single element so we have to specify the one element from the array using its index even though there's only one element in the array.
        pageTitle: products[0].title,
        path: '/products'
      })
    }
  ).catch(err => console.log(err));
  //Another way of doing the same thing as we did using findAll(), is using findByPk() :-
  // Product.findByPk(prodId).then(
  //   product=>{
  //     res.render('shop/product-detail', {
  //       product: product, //rows[0] because findById() returns an array but product-detail.ejs expects a single element so we have to specify the one element from the array using its index even though there's only one element in the array.
  //       pageTitle: product.title,
  //       path: '/products'
  //     })
  //   }
  // ).catch(err => console.log(err));

};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(
    products => { //using [rows, fieldData] is called destructuring and will directly put the values in these two variables i.e. rows will get an object array containing the data retrieved from database and fieldData will get an array containing metadata which we don't need right now atleast so its just there to show how destructuring works.
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    }
  ).catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

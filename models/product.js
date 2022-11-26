const Cart = require('./cart');
const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('insert into products (title, price, imageUrl, description) values (?, ?, ?, ?)', 
    [this.title, this.price, this.imageUrl, this.description]
    );  //we're using (?,?,?,?) here because its a secure way of inserting values into our database and helps prevent SQL injection attacks
  }

  static deleteById(id) {
    return db.execute('delete from products where products.id=?',[id]);
  }

  static fetchAll() {
    return db.execute('select * from products'); //we know that db.execute() will return a promise so we could do db.execute('select * from...').then().catch() but we're returning the entire promise itself so that we can use it somewhere else. Using then() would mean, we have to use it here itself.
  }

  static findById(id) {
    return db.execute('select * from products where products.id=?',[id]);
  }
};
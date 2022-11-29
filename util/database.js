const Sequelize = require('sequelize'); //importing the sequelize constructor function (that's why we've named it Sequelize with a capital 'S')
const sequelize = new Sequelize('node-complete', 'root', 'bagauli', {dialect: 'mysql', host:'localhost'}); //creating a sequelize object using the Sequelize constructor we imported above. This Sequelize constructor takes multiple arguments that help connect with the database i.e. databasename, username, password, and in the fourth argument, we're passing an object in which dialect refers to the sql engine we're using i.e. mysql in this case and the hostname i.e. localhost.

module.exports = sequelize;
//since we're using sequelize here, we no longer had to write any code for sql, sequelize will take care of it for us.
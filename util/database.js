const mysql = require('mysql2');
//there are two ways of connecting with a sql database, one is:- set up one connection and use that to execute queries and we should close the connection once we're done with the query and the downside is that we'll need to create a connection for every new query and close it, this isn't feasible because we have many queries to execute. So, the better way is to create a connection pool.
//connection pool is a pool of connections which will always allow us to run queries by giving a new connection to us and we use that connection to run our query. Connection pool manages multiple connections and hence allows us to run multiple queries by providing us with a connection for each query. Once the query is done executing, the connection goes back to the pool and ready to be used by another query.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'bagauli'
}); //createPool() method takes a javascript object as an argument. This object contains information about our database engine.

module.exports = pool.promise(); //using promise() so that this allows us to use promises and handle asynchronous tasks
// import express = require('express');  //this is a snytax to import a package.
import express from 'express'; //this is another way of importing.
import todosRoutes from './routes/todos';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(todosRoutes);
app.listen(4000);
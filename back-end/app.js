const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');
const downloadRoutes = require('./routes/download');
const forgotPasswordRequests = require('./models/forgotPasswordRequests');
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const Download = require('./models/download');

const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(userRoutes);
app.use(expenseRoutes);
app.use('/purchase', premiumRoutes);
app.use('/password', passwordRoutes);
app.use('/download', downloadRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgotPasswordRequests);
forgotPasswordRequests.belongsTo(User);

User.hasMany(Download);
Download.belongsTo(User);

sequelize
.sync()
// .sync({force: true})
.then(()=>{
  app.listen(4000);
}
)
.catch(err => {
  console.log(err);
});


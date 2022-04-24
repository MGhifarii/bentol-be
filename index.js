const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const productRoutes = require('./src/routes/products');
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})


app.use('/v1/customers', productRoutes)
app.use('/v1/auth', authRoutes)
app.use('/v1/blog', blogRoutes)

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
})

mongoose.connect('mongodb+srv://user:rahasia@cluster0.j5ing.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    app.listen(4000, () => console.log('Server is running on port 4000'));
  })
  .catch(err => console.log(err))
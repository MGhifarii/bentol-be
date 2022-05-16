const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
// const app = express();
// const productRoutes = require('./src/routes/products');
// const userRoutes = require('./src/routes/user');
// const articleRoutes = require('./src/routes/article');
// const path = require('path');

// set up server

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https:/bentol.netlify.app"],
    credentials: true,
  })
);

// connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

// app.use('/v1/customers', productRoutes)
// app.use('/api/users', userRoutes)
// app.use('/api/article', articleRoutes)
// set up routes

app.use("/user", require("./routers/userRouter.js"));
// app.use("/customer", require("./routers/customerRouter"));

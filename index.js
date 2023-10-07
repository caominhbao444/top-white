require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

mongoose.connect(
  "mongodb+srv://minhbao11b3:Nkokpin123@cluster0.nivfc8b.mongodb.net/?retryWrites=true&w=majority"
);

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
//Help to read request body

app.use(cors());

//router
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);

//handle errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
//Help to read request body

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./route/auth");
const productRouter = require("./route/product");
const errorHandler = require("./middleware/error");
const logger = require("./middleware/logger");


require("dotenv").config({
  path:
    process.env.NODE_ENV === "test"
      ? ".env.test"
      : process.env.NODE_ENV === "production"
      ? ".env"
      : ".env.local",
});
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to the Database"))
  .catch((error) => console.error("Error connecting to the database:", error));

app.use(express.json());
app.use(cors());
app.use(logger);


app.use(errorHandler);
app.use("/auth", authRouter);
app.use("/product", productRouter);



app.listen(3111, () => console.log("Listening to port http://localhost:3111"));

module.exports = app;
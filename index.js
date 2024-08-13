const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(
  __dirname,
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : process.env.NODE_ENV === "production"
    ? ".env"
    : ".env.local"
);

dotenv.config({ path: envPath });



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./route/auth");
const productRouter = require("./route/product");
const errorHandler = require("./middleware/error");
const logger = require("./middleware/logger");

const app = express();

// Ensure MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in the environment.");
  process.exit(1); // Exit with a failure code
}

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to the Database"))
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit with a failure code
  });

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use("/auth", authRouter);
app.use("/product", productRouter);

// Error handling middleware should be after all routes
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3111;
app.listen(PORT, () =>
  console.log(`Listening to port http://localhost:${PORT}`)
);

module.exports = app;

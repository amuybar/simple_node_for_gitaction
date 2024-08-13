function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  // Default status code to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}

module.exports = errorHandler;

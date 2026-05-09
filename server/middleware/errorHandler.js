function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const code = error.code || "INTERNAL_ERROR";

  res.status(statusCode).json({
    error: {
      code,
      message:
        statusCode === 500 ? "An unexpected server error occurred" : error.message
    }
  });
}

module.exports = { errorHandler };

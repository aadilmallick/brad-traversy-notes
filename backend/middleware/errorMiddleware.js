const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  console.log("we got an error here boys!");
  return res.json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = { errorHandler };

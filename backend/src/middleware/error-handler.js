const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const error = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something wrong',
  };

  if (err.errno === 1062) {
    error.statusCode = 400;
    error.msg = `Duplicate ${err.message.split('entry "')[1].split('-')[0]}`;
  }
  if (err.errno === 1366 || err.errno === 1265) {
    error.statusCode = 400;
  }

  return res.status(error.statusCode).json({ msg: error.msg });
};

export default errorHandlerMiddleware;

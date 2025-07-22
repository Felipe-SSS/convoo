function errorMiddleware(err, req, res, next) {
  console.error(err); // Log do erro no servidor

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({
    success: false,
    error: message,
  });
}

module.exports = errorMiddleware;

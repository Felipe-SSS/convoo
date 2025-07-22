const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    const error = new Error("Token não fornecido.");
    error.status = 401;
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Token inválido.");
      error.status = 401;
      return next(error);
    }
    req.user = user; // userId, name, role
    next();
  });
}

module.exports = autenticarToken;

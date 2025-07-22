function autorizarRole(rolesPermitidas) {
  return (req, res, next) => {
    if (!rolesPermitidas.includes(req.user.role)) {
      const error = new Error("Acesso negado.");
      error.status = 403;
      return next(error);
    }
    next();
  };
}

module.exports = autorizarRole;

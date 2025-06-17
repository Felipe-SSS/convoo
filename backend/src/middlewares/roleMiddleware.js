function autorizarRole(rolesPermitidas) {
  return (req, res, next) => {
    if (!rolesPermitidas.includes(req.user.role)) {
      return res.status(403).json({ erro: "Acesso negado." });
    }
    next();
  };
}

module.exports = autorizarRole;

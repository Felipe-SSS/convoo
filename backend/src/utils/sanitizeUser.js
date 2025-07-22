function sanitizeUser(user) {
  if (!user || typeof user !== "object") return null;

  const {
    password,
    verification_token,
    verification_sent_at,
    reset_password_token,
    reset_password_sent_at,
    updated_at,
    ...safeUser
  } = user;

  return safeUser;
}

function sanitizeUsers(users) {
  return Array.isArray(users) ? users.map(sanitizeUser) : [];
}

module.exports = {
  sanitizeUser,
  sanitizeUsers,
};

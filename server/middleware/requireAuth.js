const { AppError } = require("../utils/AppError");
const { cookieName, verifyAuthToken } = require("../utils/authToken");

function requireAuth(req, res, next) {
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  const token = req.cookies[cookieName] || bearerToken;

  if (!token) {
    return next(new AppError("Authentication required", 401, "UNAUTHENTICATED"));
  }

  try {
    req.auth = verifyAuthToken(token);
    return next();
  } catch (error) {
    return next(new AppError("Invalid or expired session", 401, "INVALID_SESSION"));
  }
}

module.exports = { requireAuth };

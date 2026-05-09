const jwt = require("jsonwebtoken");
const { jwtSecret, nodeEnv } = require("../config/env");

const cookieName = "mern_session";

function signAuthToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email
    },
    jwtSecret,
    { expiresIn: "7d" }
  );
}

function verifyAuthToken(token) {
  return jwt.verify(token, jwtSecret);
}

function setAuthCookie(res, token) {
  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: nodeEnv === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

function clearAuthCookie(res) {
  res.clearCookie(cookieName, {
    httpOnly: true,
    sameSite: "lax",
    secure: nodeEnv === "production"
  });
}

module.exports = {
  clearAuthCookie,
  cookieName,
  setAuthCookie,
  signAuthToken,
  verifyAuthToken
};

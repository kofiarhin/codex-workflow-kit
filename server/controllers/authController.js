const { asyncHandler } = require("../middleware/asyncHandler");
const User = require("../models/User");
const { AppError } = require("../utils/AppError");
const {
  clearAuthCookie,
  setAuthCookie,
  signAuthToken
} = require("../utils/authToken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required", 400, "INVALID_INPUT");
  }

  if (password.length < 8) {
    throw new AppError("Password must be at least 8 characters", 400, "WEAK_PASSWORD");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("An account with that email already exists", 409, "EMAIL_EXISTS");
  }

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({ name, email, passwordHash });
  const token = signAuthToken(user);
  setAuthCookie(res, token);

  res.status(201).json({ user: user.toPublicJSON() });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400, "INVALID_INPUT");
  }

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  const passwordMatches = await user.verifyPassword(password);
  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  const token = signAuthToken(user);
  setAuthCookie(res, token);

  res.json({ user: user.toPublicJSON() });
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.auth.sub);
  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  res.json({ user: user.toPublicJSON() });
});

function logout(req, res) {
  clearAuthCookie(res);
  res.json({ ok: true });
}

module.exports = {
  login,
  logout,
  me,
  register
};

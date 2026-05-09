const { asyncHandler } = require("../middleware/asyncHandler");
const User = require("../models/User");
const { AppError } = require("../utils/AppError");
const {
  clearAuthCookie,
  setAuthCookie,
  signAuthToken
} = require("../utils/authToken");

const supportedAvatarExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function normalizeAvatarUrl(value) {
  if (value === undefined || value === null) return "";

  if (typeof value !== "string") {
    throw new AppError("Avatar URL must be a string", 400, "INVALID_INPUT");
  }

  const avatarUrl = value.trim();
  if (!avatarUrl) return "";

  if (avatarUrl.length > 2048) {
    throw new AppError("Avatar URL must be 2048 characters or fewer", 400, "INVALID_INPUT");
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(avatarUrl);
  } catch {
    throw new AppError("Avatar URL must be a valid URL", 400, "INVALID_INPUT");
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new AppError("Avatar URL must start with http or https", 400, "INVALID_INPUT");
  }

  const pathname = parsedUrl.pathname.toLowerCase();
  const hasSupportedExtension = Array.from(supportedAvatarExtensions).some((extension) =>
    pathname.endsWith(extension)
  );

  if (!hasSupportedExtension) {
    throw new AppError("Avatar URL must end in JPG, PNG, or WebP", 400, "INVALID_INPUT");
  }

  return avatarUrl;
}

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

const updateProfile = asyncHandler(async (req, res) => {
  const avatarUrl = normalizeAvatarUrl(req.body.avatarUrl);

  const user = await User.findByIdAndUpdate(
    req.auth.sub,
    { $set: { avatarUrl } },
    { new: true, runValidators: true }
  );

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
  register,
  updateProfile
};

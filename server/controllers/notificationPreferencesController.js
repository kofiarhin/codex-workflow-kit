const { asyncHandler } = require("../middleware/asyncHandler");
const User = require("../models/User");
const { AppError } = require("../utils/AppError");

const booleanPreferenceKeys = [
  "accountActivity",
  "productUpdates",
  "workflowSummary",
  "marketing"
];

const digestFrequencies = new Set(["instant", "daily", "weekly", "off"]);

function serializeNotificationPreferences(preferences = {}) {
  return {
    securityAlerts: preferences.securityAlerts ?? true,
    accountActivity: preferences.accountActivity ?? true,
    productUpdates: preferences.productUpdates ?? false,
    workflowSummary: preferences.workflowSummary ?? true,
    marketing: preferences.marketing ?? false,
    digestFrequency: preferences.digestFrequency ?? "weekly"
  };
}

const getNotificationPreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.auth.sub);
  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  res.json({
    notificationPreferences: serializeNotificationPreferences(
      user.notificationPreferences
    )
  });
});

const updateNotificationPreferences = asyncHandler(async (req, res) => {
  const payload = req.body.notificationPreferences || req.body;
  const updates = {
    "notificationPreferences.securityAlerts": true
  };

  for (const key of booleanPreferenceKeys) {
    if (!Object.prototype.hasOwnProperty.call(payload, key)) continue;
    if (typeof payload[key] !== "boolean") {
      throw new AppError(`${key} must be a boolean`, 400, "INVALID_INPUT");
    }
    updates[`notificationPreferences.${key}`] = payload[key];
  }

  if (Object.prototype.hasOwnProperty.call(payload, "digestFrequency")) {
    if (!digestFrequencies.has(payload.digestFrequency)) {
      throw new AppError(
        "Digest frequency must be instant, daily, weekly, or off",
        400,
        "INVALID_INPUT"
      );
    }
    updates["notificationPreferences.digestFrequency"] = payload.digestFrequency;
  }

  const user = await User.findByIdAndUpdate(
    req.auth.sub,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  res.json({
    notificationPreferences: serializeNotificationPreferences(
      user.notificationPreferences
    )
  });
});

module.exports = {
  getNotificationPreferences,
  updateNotificationPreferences
};

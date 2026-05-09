const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const notificationPreferencesSchema = new mongoose.Schema(
  {
    securityAlerts: {
      type: Boolean,
      default: true
    },
    accountActivity: {
      type: Boolean,
      default: true
    },
    productUpdates: {
      type: Boolean,
      default: false
    },
    workflowSummary: {
      type: Boolean,
      default: true
    },
    marketing: {
      type: Boolean,
      default: false
    },
    digestFrequency: {
      type: String,
      enum: ["instant", "daily", "weekly", "off"],
      default: "weekly"
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    notificationPreferences: {
      type: notificationPreferencesSchema,
      default: () => ({})
    }
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hash(password, 12);
};

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
    notificationPreferences: this.notificationPreferences,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model("User", userSchema);

const express = require("express");
const {
  getNotificationPreferences,
  updateNotificationPreferences
} = require("../controllers/notificationPreferencesController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);
router.get("/", getNotificationPreferences);
router.patch("/", updateNotificationPreferences);

module.exports = router;

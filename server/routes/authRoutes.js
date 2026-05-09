const express = require("express");
const {
  login,
  logout,
  me,
  register,
  updateProfile
} = require("../controllers/authController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.patch("/profile", requireAuth, updateProfile);

module.exports = router;

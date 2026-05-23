const express = require("express");
const {
  createBraidService,
  deleteBraidService,
  listBraidServices,
  updateBraidService
} = require("../controllers/braidServiceController");

const router = express.Router();

router.get("/", listBraidServices);
router.post("/", createBraidService);
router.patch("/:id", updateBraidService);
router.delete("/:id", deleteBraidService);

module.exports = router;

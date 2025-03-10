const express = require("express");
const { getAdminStats } = require("../controllers/adminStatsController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

//GET All Menu items operations
router.get("/", getAdminStats);

module.exports = router;
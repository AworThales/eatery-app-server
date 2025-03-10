const express = require("express");

const verifyToken = require("../middlewares/verifyToken");
const { getAllOrderStats } = require("../controllers/orderStatsController");

const router = express.Router();

//GET All Menu items operations
router.get("/", getAllOrderStats );

module.exports = router;
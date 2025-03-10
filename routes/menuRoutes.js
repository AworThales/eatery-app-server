const express = require("express");
const { getAllMenuItems, postMenuItems, deleteMenuItem, getSingleMenuItem, updateMenuItem } = require("../controllers/menuContoller");

const router = express.Router();

//GET All Menu items operations
router.get("/", getAllMenuItems);
router.post("/", postMenuItems);
router.delete("/:id", deleteMenuItem);
router.get("/:id", getSingleMenuItem);
router.patch("/:id", updateMenuItem);

module.exports = router;

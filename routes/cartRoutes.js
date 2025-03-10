const express = require("express");
const { getCartByEmail, addToCart, deleteCart, updateCart, getSingleCart } = require("../controllers/cartController");

const router = express.Router();

//GET All Menu items operations
router.get("/", getCartByEmail);
router.post("/", addToCart)
router.delete("/:id", deleteCart);
router.put("/:id", updateCart);
router.get("/:id", getSingleCart);

module.exports = router;

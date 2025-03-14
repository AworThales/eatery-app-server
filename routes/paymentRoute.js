const express = require("express");
const router = express.Router();
// Token
const verifyToken = require("../middlewares/verifyToken");
const { postPaymentDetails, getPaymentsByEmail, getAllPayments, confirmPaymentStatus } = require("../controllers/paymentController");



router.post("/", verifyToken, postPaymentDetails);

router.get("/:email", verifyToken, getPaymentsByEmail);

router.get("/", verifyToken, getAllPayments);

router.patch("/:id", verifyToken, confirmPaymentStatus);

module.exports = router;

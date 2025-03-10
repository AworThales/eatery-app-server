const express = require("express");
const router = express.Router();



const verifyToken = require("../middlewares//verifyToken");
const { getAllUsers, createUser, deleteUser, getAdmin, makeAdmin, makeUserBack,  } = require("../controllers/userController");
const verifyAdmin = require("../middlewares/verifyAdmin");

//GET All Users Operations
router.get("/", getAllUsers);
router.post("/", createUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);
router.get("/admin/:email", verifyToken, getAdmin);
router.patch("/admin/:id/makeadmin", verifyToken, verifyAdmin, makeAdmin);
router.patch("/admin/:id/makeuserback", verifyToken, verifyAdmin, makeUserBack);


module.exports = router;

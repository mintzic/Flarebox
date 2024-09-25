const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware.checkAdmin, adminController.createUser);
router.delete("/:username", authMiddleware.checkAdmin, adminController.deleteUser);
router.get("/", authMiddleware.checkAdmin, adminController.listUsers);

module.exports = router;

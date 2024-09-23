const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/bucket", authMiddleware.checkAdmin, adminController.createBucket);
router.delete("/bucket/:bucketName", authMiddleware.checkAdmin, adminController.deleteBucket);
router.post("/user", authMiddleware.checkAdmin, adminController.createUser);
router.delete("/user/:username", authMiddleware.checkAdmin, adminController.deleteUser);
router.get("/users", authMiddleware.checkAdmin, adminController.listUsers);
router.post("/user-policy", authMiddleware.checkAdmin, adminController.setUserPolicy);

module.exports = router;

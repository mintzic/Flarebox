const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/bucket", adminController.createBucket);
router.delete("/bucket/:bucketName", adminController.deleteBucket);
router.post("/user", adminController.createUser);
router.delete("/user/:username", adminController.deleteUser);
router.get("/users", adminController.listUsers);
router.post("/user-policy", adminController.setUserPolicy);

module.exports = router;

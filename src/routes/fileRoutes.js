const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/fileController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/:bucket/upload", upload.single("file"), fileController.uploadFile);
router.get("/:bucket/download/:filename", fileController.downloadFile);
router.get("/:bucket/list", fileController.listFiles);
router.delete("/:bucket/delete/:filename", fileController.deleteFile);

module.exports = router;

const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/fileController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), fileController.uploadFile);
router.get("/download/:filename", fileController.downloadFile);
router.get("/list", fileController.listFiles);
router.delete("/delete/:filename", fileController.deleteFile);

module.exports = router;

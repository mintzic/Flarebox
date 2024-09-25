const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/fileController");
const middlewareWare = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upl", middlewareWare.checkAuth, upload.single("file"), fileController.uploadFile);
router.get("/", middlewareWare.checkAuth, fileController.listFiles);
router.get("/dwn/:filename", middlewareWare.checkAuth, fileController.downloadFile);
router.delete("/:filename", middlewareWare.checkAuth, fileController.deleteFile);

module.exports = router;

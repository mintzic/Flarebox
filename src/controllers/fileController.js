const minioService = require("../services/minioService");

module.exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No files were uploaded.");
    }
    const result = await minioService.uploadFile(
      res.locals.username,
      req.file.originalname,
      req.file.buffer,
      req.file.mimetype
    );
    res.status(200).json({ message: "File uploaded successfully", etag: result.etag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.downloadFile = async (req, res, next) => {
  try {
    const fileStream = await minioService.getFile(res.locals.username, req.params.filename);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.listFiles = async (req, res, next) => {
  try {
    const files = await minioService.listFiles(res.locals.username);
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteFile = async (req, res, next) => {
  try {
    await minioService.deleteFile(res.locals.username, req.params.filename);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

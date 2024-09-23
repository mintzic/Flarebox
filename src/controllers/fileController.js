const minioService = require("../services/minioService");

module.exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No files were uploaded.");
    }
    const result = await minioService.uploadFile(
      req.params.bucket,
      req.file.originalname,
      req.file.buffer,
      req.file.mimetype
    );
    res.status(200).json({ message: "File uploaded successfully", etag: result.etag });
  } catch (error) {
    next(error);
  }
};

module.exports.downloadFile = async (req, res, next) => {
  try {
    const fileStream = await minioService.getFile(req.params.bucket, req.params.filename);
    fileStream.pipe(res);
  } catch (error) {
    next(error);
  }
};

module.exports.listFiles = async (req, res, next) => {
  try {
    const files = await minioService.listFiles(req.params.bucket);
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteFile = async (req, res, next) => {
  try {
    await minioService.deleteFile(req.params.bucket, req.params.filename);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const minioService = require("../services/minioService");

exports.createBucket = async (req, res, next) => {
  try {
    const { bucketName, region } = req.body;
    await minioService.createBucket(bucketName, region);
    res.status(201).json({ message: "Bucket created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteBucket = async (req, res, next) => {
  try {
    const { bucketName } = req.params;
    await minioService.deleteBucket(bucketName);
    res.json({ message: "Bucket deleted successfully" });
  } catch (error) {
    next(error);
  }
};

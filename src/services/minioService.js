const Minio = require("minio");
const minioConfig = require("../../config/minioConfig");

const minioClient = new Minio.Client(minioConfig);

exports.uploadFile = (filename, buffer, mimetype) => {
  return minioClient.putObject(minioConfig.bucketName, filename, buffer, buffer.length, { "Content-Type": mimetype });
};

exports.getFile = (filename) => {
  return minioClient.getObject(minioConfig.bucketName, filename);
};

exports.listFiles = () => {
  return new Promise((resolve, reject) => {
    const files = [];
    const stream = minioClient.listObjects(minioConfig.bucketName, "", true);
    stream.on("data", (obj) => files.push(obj.name));
    stream.on("error", reject);
    stream.on("end", () => resolve(files));
  });
};

exports.createBucket = (bucketName, region) => {
  return minioClient.makeBucket(bucketName, region);
};

exports.deleteFile = (filename) => {
  return minioClient.removeObject(minioConfig.bucketName, filename);
};

exports.deleteBucket = (bucketName) => {
  return minioClient.removeBucket(bucketName);
};

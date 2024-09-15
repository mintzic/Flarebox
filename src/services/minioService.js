const { exec } = require("child_process");
const Minio = require("minio");
const minioConfig = require("../../config/minioConfig");

const minioClient = new Minio.Client(minioConfig);

exports.uploadFile = (bucketName, filename, buffer, mimetype) => {
  return minioClient.putObject(bucketName, filename, buffer, buffer.length, { "Content-Type": mimetype });
};

exports.getFile = (bucketName, filename) => {
  return minioClient.getObject(bucketName, filename);
};

exports.listFiles = (bucketName) => {
  return new Promise((resolve, reject) => {
    const files = [];
    const stream = minioClient.listObjects(bucketName, "", true);
    stream.on("data", (obj) => files.push(obj.name));
    stream.on("error", reject);
    stream.on("end", () => resolve(files));
  });
};

exports.createBucket = (bucketName, region) => {
  return minioClient.makeBucket(bucketName, region);
};

exports.deleteFile = (bucketName, filename) => {
  return minioClient.removeObject(minioConfig.bucketName, filename);
};

exports.deleteBucket = (bucketName) => {
  return minioClient.removeBucket(bucketName);
};

exports.createUser = async (username, password) => {
  exec(`mc admin user add ${minioConfig.alias} ${username} ${password}`, (error, stdout, stderr) => {
    if (error) {
      throw new Error(stderr);
    }
    return stdout;
  });
};

exports.deleteUser = async (username) => {
  exec(`mc admin user remove ${minioConfig.alias} ${username}`, (error, stdout, stderr) => {
    if (error) {
      throw new Error(stderr);
    }
    return stdout;
  });
};

exports.listUsers = async () => {
  exec(`mc admin user list ${minioConfig.alias}`, (error, stdout, stderr) => {
    if (error) {
      throw new Error(stderr);
    }
    return stdout;
  });
};

exports.setUserPolicy = async (username, bucketName) => {
  exec(
    `mc admin policy set ${minioConfig.alias} readwrite user=${username} bucket=${bucketName}`,
    (error, stdout, stderr) => {
      if (error) {
        throw new Error(stderr);
      }
      return stdout;
    }
  );
};

exports.enableVersioning = (bucketName) => {
  exec(`mc version enable ${minioConfig.alias}/${bucketName}`, (error, stdout, stderr) => {
    if (error) {
      throw new Error(stderr);
    }
    return stdout;
  });
};

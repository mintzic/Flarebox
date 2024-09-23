const { exec } = require("child_process");
const Minio = require("minio");
const minioConfig = require("../../config/minioConfig");

module.exports.uploadFile = (accessKey, secretKey, bucketName, filename, buffer, mimetype) => {
  const minioClient = new Minio.Client(...minioConfig, accessKey, secretKey);

  return minioClient.putObject(bucketName, filename, buffer, buffer.length, { "Content-Type": mimetype });
};

module.exports.getFile = (accessKey, secretKey, bucketName, filename) => {
  const minioClient = new Minio.Client(...minioConfig, accessKey, secretKey);

  return minioClient.getObject(bucketName, filename);
};

module.exports.listFiles = (bucketName) => {
  const minioClient = new Minio.Client(...minioConfig, accessKey, secretKey);

  return new Promise((resolve, reject) => {
    const files = [];
    const stream = minioClient.listObjects(bucketName, "", true);
    stream.on("data", (obj) => files.push(obj.name));
    stream.on("error", reject);
    stream.on("end", () => resolve(files));
  });
};

module.exports.createBucket = (bucketName, region) => {
  const minioClient = new Minio.Client(...minioConfig, accessKey, secretKey);

  return minioClient.makeBucket(bucketName, region);
};

module.exports.deleteFile = (bucketName, filename) => {
  const minioClient = new Minio.Client(...minioConfig, accessKey, secretKey);

  return minioClient.removeObject(bucketName, filename);
};

module.exports.deleteBucket = (bucketName) => {
  const minioClient = new Minio.Client(...minioConfig, accessKey, secretKey);

  return minioClient.removeBucket(bucketName);
};

module.exports.createUser = async (username, password) => {
  exec(
    `
    mc mb ${minioConfig.alias}/${username} &&
    mc admin user add ${minioConfig.alias} ${username} ${password} && 
    mc admin policy set ${minioConfig.alias} readwrite user=${username} bucket=${username} &&
    mc version enable ${minioConfig.alias}/${username}
    `,
    (error, stdout, stderr) => {
      if (error) {
        throw new Error(stderr);
      }
      return stdout;
    }
  );
};

module.exports.deleteUser = async (username) => {
  exec(
    `
    mc rb ${minioConfig.alias}/${username} &&
    mc admin user remove ${minioConfig.alias} ${username}
    `,
    (error, stdout, stderr) => {
      if (error) {
        throw new Error(stderr);
      }
      return stdout;
    }
  );
};

module.exports.listUsers = async () => {
  exec(`mc admin user list ${minioConfig.alias}`, (error, stdout, stderr) => {
    if (error) {
      throw new Error(stderr);
    }
    return stdout;
  });
};

module.exports.setUserPolicy = async (username, bucketName) => {
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

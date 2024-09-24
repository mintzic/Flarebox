const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);
const Minio = require("minio");
const minioConfig = require("../../config/minioConfig");

// Create a new Minio client with the config options
const minioClient = new Minio.Client(minioConfig);

// Helper function to execute mc commands
async function executeMcCommand(command) {
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.error("Command stderr:", stderr);
    }
    return stdout.trim();
  } catch (error) {
    console.error("Error executing command:", error);
    throw error;
  }
}

module.exports.uploadFile = async (bucketName, filename, buffer, mimetype) => {
  if (await minioClient.bucketExists(bucketName)) {
    return minioClient.putObject(bucketName, filename, buffer, buffer.length, { "Content-Type": mimetype });
  } else {
    throw new Error("Unauthorized access");
  }
};

module.exports.getFile = async (bucketName, filename) => {
  if (await minioClient.bucketExists(bucketName)) {
    return minioClient.getObject(bucketName, filename);
  } else {
    throw new Error("Unauthorized access");
  }
};

module.exports.listFiles = async (bucketName) => {
  if (await minioClient.bucketExists(bucketName)) {
    return new Promise((resolve, reject) => {
      const files = [];
      const stream = minioClient.listObjects(bucketName, "", true);
      stream.on("data", (obj) => files.push(obj.name));
      stream.on("error", reject);
      stream.on("end", () => resolve(files));
    });
  } else {
    throw new Error("Unauthorized access");
  }
};

module.exports.deleteFile = async (bucketName, filename) => {
  if (await minioClient.bucketExists(bucketName)) {
    return minioClient.removeObject(bucketName, filename);
  } else {
    throw new Error("Unauthorized access");
  }
};

module.exports.createUser = async (username, password) => {
  if (await minioClient.bucketExists(username)) {
    throw new Error("User already exists");
  } else {
    await minioClient.makeBucket(username, "us-east-1");
  }

  const commands = [
    `mc admin user add ${minioConfig.alias} ${username} ${password}`,
    `mc admin policy attach ${minioConfig.alias} user-bucket-policy --user ${username}`,
    `mc version enable ${minioConfig.alias}/${username}`,
  ];

  const result = [];

  for (const command of commands) {
    const stdout = await executeMcCommand(command);
    result.push(stdout);
  }

  return result;
};

module.exports.deleteUser = async (username) => {
  if (await minioClient.bucketExists(username)) {
    await minioClient.removeBucket(username);
  } else {
    throw new Error("User does not exist");
  }

  const commands = [`mc admin user rm ${minioConfig.alias} ${username}`];

  const result = [];

  for (const command of commands) {
    const stdout = await executeMcCommand(command);
    result.push(stdout);
  }

  return result;
};

module.exports.listUsers = async () => {
  const command = `mc admin user list ${minioConfig.alias}`;
  return executeMcCommand(command);
};

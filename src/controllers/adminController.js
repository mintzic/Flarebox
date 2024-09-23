const minioService = require("../services/minioService");

module.exports.createBucket = async (req, res, next) => {
  try {
    const { bucketName, region } = req.body;
    await minioService.createBucket(bucketName, region);
    res.status(201).json({ message: "Bucket created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteBucket = async (req, res, next) => {
  try {
    const { bucketName } = req.params;
    await minioService.deleteBucket(bucketName);
    res.json({ message: "Bucket deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    } else if (password.length < 8 || password.length > 40) {
      return res.status(400).send("Password must be between 8 and 40 characters");
    }

    const result = await minioService.createUser(username, password);

    res.status(201).json({ message: "User created successfully", result });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).send("Username is required");
    }

    const result = await minioService.deleteUser(username);

    res.status(200).json({ message: "User deleted successfully", result });
  } catch (error) {
    next(error);
  }
};

module.exports.listUsers = async (req, res, next) => {
  try {
    const users = await minioService.listUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.setUserPolicy = async (req, res, next) => {
  try {
    const { username, bucketName } = req.body;

    if (!username || !bucketName) {
      return res.status(400).send("Username and bucket name are required");
    }

    const result = await minioService.setUserPolicy(username, bucketName);
    res.status(200).json({ message: "User policy set successfully", result });
  } catch (error) {
    next(error);
  }
};

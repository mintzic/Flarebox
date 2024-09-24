const minioService = require("../services/minioService");

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
    res.status(500).json(error?.message);
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
    res.status(500).json(error?.message);
  }
};

module.exports.listUsers = async (req, res, next) => {
  try {
    const users = await minioService.listUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error?.message);
  }
};

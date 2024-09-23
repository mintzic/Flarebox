const config = require("../../config/minioConfig");

module.exports.checkAuth = (req, res, next) => {
  // require basic authentication
  if (req.headers.authorization.startsWith("Basic ")) {
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    res.locals.username = username;
    res.locals.password = password;

    return next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.checkAdmin = (req, res, next) => {
  if (res.locals.username === config.accessKey && res.locals.password === config.secretKey) {
    return next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

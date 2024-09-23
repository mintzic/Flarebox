const fs = require("fs");

module.exports = {
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: fs.readFileSync(process.env.MINIO_SECRET_KEY_FILE).toString(),
  alias: process.env.MINIO_ALIAS,
};

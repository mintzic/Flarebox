module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "NotFound") {
    return res.status(404).json({ error: "Resource not found" });
  }

  if (err.name === "BucketAlreadyExists" || err.name === "BucketAlreadyOwnedByYou") {
    return res.status(409).json({ error: "Bucket already exists" });
  }

  res.status(500).json({ error: "Internal server error" });
};

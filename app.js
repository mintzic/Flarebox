const express = require("express");
const fileRoutes = require("./src/routes/fileRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const errorHandler = require("./src/utils/errorHandler");
const authMiddleware = require("./src/middleware/authMiddleware");

const app = express();

app.use(express.json());

app.use("/", fileRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

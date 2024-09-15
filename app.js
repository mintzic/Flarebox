const express = require("express");
const fileRoutes = require("./src/routes/fileRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const errorHandler = require("./src/utils/errorHandler");

const app = express();

app.use(express.json());

app.use("/files", fileRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

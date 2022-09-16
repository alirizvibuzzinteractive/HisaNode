const express = require("express");
const expressFileUpload = require("express-fileupload");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const webRoutes = require("./routes/web");

const app = express();
dotenv.config({ path: "./.env" });
const corsOption = {
  origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));


app.use(expressFileUpload())

app.listen(process.env.PORT, () => {
  console.log(`server is lintening at port ${process.env.PORT}`);
});
app.use(express.json());

mongoose
  .connect(process.env.DBSTRING)
  .then(() => {
    console.log("DB connected");
    app.use("/web", webRoutes);
  })
  .catch((error) => {
    console.warn("Error Message: ", error);
  });

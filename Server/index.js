const user = require("./Router/user");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Router/auth");
//config dotenv
dotenv.config();
mongoose
  .connect(process.env.URL)
  .then((data) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(express.json());
app.use("/api/users", user);
app.use('/api/auth',authRoute)

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port 4000 ");
});

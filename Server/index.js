//import the express library
const express = require("express");
const app = express();
//import the mongoose library
const mongoose = require("mongoose");
//import the dotenv library
const dotenv = require("dotenv");
//config dotenv
dotenv.config();
//Connect the databas
mongoose
  .connect(process.env.URL)
  .then((data) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

//listening the port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port 4000 ");
});


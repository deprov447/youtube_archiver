const express = require("express");
const dotenv = require("dotenv").config();

const router = require("./routes");

const PORT = process.env.PORT || 4000;

express()
  .use(router)
  .listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });

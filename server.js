const express = require("express");
const dotenv = require("dotenv").config();

const router = require("./routes");
const bootstrapIngestion = require("./src/ingestion/bootstrapIngestion");

const PORT = process.env.PORT || 4000;

bootstrapIngestion(10)

express()
  .use(router)
  .listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });

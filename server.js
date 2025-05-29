const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const router = require("./routes");
const bootstrapIngestion = require("./src/ingestion/bootstrapIngestion");
const createTSSchema = require("./src/ingestion/createTSSchema");

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

createTSSchema();
bootstrapIngestion(10);

const PORT = process.env.PORT || 4000;
express()
  .use(router)
  .listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });

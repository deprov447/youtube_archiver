const express = require("express");
const search = require("./src/search/search");

const router = express();

router.get("/results", search);

module.exports = router;

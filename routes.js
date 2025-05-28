const express = require("express");

const router = express();

router.get("/", (req, res) => {
  res.send("hw");
});

module.exports = router;

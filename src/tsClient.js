const Typesense = require("typesense");

let tsclient = new Typesense.Client({
  nodes: [
    {
      host: process.env.TS_HOST || "localhost",
      port: process.env.TS_PORT || 8108,
      protocol: process.env.TS_PROTOCOL || "http",
    },
  ],
  apiKey: process.env.TS_API_KEY,
  connectionTimeoutSeconds: 2,
});

module.exports = tsclient;

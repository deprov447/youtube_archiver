let videoTSSchema = {
  name: "videos",
  fields: [
    { name: "title", type: "string" },
    { name: "id", type: "string" },
    { name: "description", type: "string" },
  ],
};

module.exports = videoTSSchema;

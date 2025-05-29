const videoTSSchema = require("../models/VideoTs");
const tsclient = require("../tsClient");

async function createTSSchema() {
  const collectionsList = await tsclient.collections().retrieve();
  var toCreate = collectionsList.find((value, _, __) => {
    return value["name"] == videoTSSchema["name"];
  });

  if (!toCreate) {
    await tsclient.collections().create(videoTSSchema);
  }
}

module.exports = createTSSchema
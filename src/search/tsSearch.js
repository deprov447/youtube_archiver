const videoTSSchema = require("../models/VideoTs");
const tsclient = require("../tsClient");

async function tssearch(query) {
  let searchParameters = {
    q: query,
    query_by: "title,description",
  };

  return await tsclient
    .collections(videoTSSchema["name"])
    .documents()
    .search(searchParameters)
    .then((searchResult) =>
      searchResult.hits.map(({ document }) => document.id)
    );
}

module.exports = tssearch;

const Video = require("../models/Video");
const tssearch = require("./tsSearch");

async function search(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search_query = req.query.search_query;

  const skip = (page - 1) * limit;
  const ids = await tssearch(search_query)

  const videos = await Video.find({ _id: { $in: ids } })
  .sort({ publishedAt: -1 })
  .skip(skip)
  .limit(limit);
  
  const total = ids.length;
  console.log(`Found total ${total} records for query='${search_query}'`)

  res.json({
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    data: videos,
  });
}

module.exports = search;

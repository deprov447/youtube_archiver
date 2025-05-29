const Video = require("../models/Video");

async function search(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search_query = req.query.search_query;

  const skip = (page - 1) * limit;

  const query = { title: { $regex: search_query, $options: "i" } };

  const videos = await Video.find(query)
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = videos.length;

  res.json({
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    data: videos,
  });
}

module.exports = search;

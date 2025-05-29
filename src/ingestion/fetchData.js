const axios = require("axios");
const tsclient = require("../tsClient");
const Video = require("../models/Video");
let { apikey, failoverApiKey } = require("./apiKeyFailover");
const videoTSSchema = require("../models/VideoTs");

async function callYTAPI(publishedAfter, pageToken) {
  const fs = require("fs");
  const path = require("path");
  if (process.env.TEST_MODE === "true") {
    const mockData = fs.readFileSync(
      path.join(__dirname, "mockdata.json"),
      "utf-8" 
    );
    return JSON.parse(mockData);
  }
  try {
    let config = {
      method: "GET",
      url: "https://youtube.googleapis.com/youtube/v3/search",
      headers: {
        Accept: "application/json",
      },
      params: {
        q: "official",
        part: "snippet",
        maxResults: process.env.MAX_RESULTS_PER_PAGE || 5,
        order: "date",
        type: "video",
        key: apikey,
        publishedAfter,
        pageToken,
      },
    };

    if (pageToken == null) delete config.params.pageToken;

    return await axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch(async (error) => {
        if (
          error.status == 403 &&
          error.response.data.error.errors[0].reason == "quotaExceeded"
        ) {
          console.log("QuotaExceeded");
          apikey = failoverApiKey();
          return await callYTAPI(publishedAfter, pageToken);
        } else throw "Request failed with error: " + error;
      });
  } catch (err) {
    throw err;
  }
}

async function fetchData(publishedAfter) {
  try {
    console.log("Fetching YT data published after: " + publishedAfter);
    let parsedYTRes = [];
    let nextPageToken = null;
    let pagesTraversed = 0;
    do {
      try {
        const ytRes = await callYTAPI(publishedAfter, nextPageToken);
        pagesTraversed++;
        parsedYTRes = ytRes.items.map(({ id, snippet }) => {
          return {
            _id: id.videoId,
            title: snippet.title,
            description: snippet.description,
            publishedAt: snippet.publishedAt,
            thumbnails: snippet.thumbnails,
          };
        });
        nextPageToken = ytRes.nextPageToken || null;
      } catch (err) {
        console.log(err);
      }
    } while (
      nextPageToken &&
      pagesTraversed < process.env.MAX_PAGES_TO_TRAVERSE
    );

    await parsedYTRes.forEach(async (video) => {
      await tsclient.collections(videoTSSchema["name"]).documents().upsert({
        title: video.title,
        id: video._id,
      });
    });

    await Video.insertMany(parsedYTRes, { ordered: false }).catch((err) => {
      if (err.code !== 11000) console.error(err);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = fetchData;

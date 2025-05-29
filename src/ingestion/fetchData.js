const axios = require("axios");

async function callYTAPI(publishedAfter, pageToken) {
  let config = {
    method: "GET",
    url: "https://youtube.googleapis.com/youtube/v3/search",
    headers: {
      Accept: "application/json",
    },
    params: {
      q: "football",
      part: "snippet",
      maxResults: process.env.MAX_RESULTS_PER_PAGE || 5,
      order: "date",
      type: "video",
      key: process.env.API_KEY,
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
    .catch((error) => {
      console.log(error);
    });
}

async function fetchData(publishedAfter) {
    let parsedYTRes = []
    let nextPageToken = null
    let pagesTraversed = 0
    do {
        const ytRes = await callYTAPI(publishedAfter, nextPageToken)
        pagesTraversed++;
        parsedYTRes = ytRes.items.map(({id, snippet})=>{
            return {
                id: id.videoId,
                title: snippet.title,
                description: snippet.description,
                publishedAt: snippet.publishedAt,
                thumbnails: snippet.thumbnails
            }
        })
        nextPageToken = ytRes.nextPageToken || null
    } while (nextPageToken && pagesTraversed < process.env.MAX_PAGES_TO_TRAVERSE);
    // db save
    console.log(parsedYTRes)
}

module.exports = fetchData;

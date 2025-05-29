let { apikey } = require("./apiKeyFailover");

function failoverApiKey() {
  const currentKey = apikey;
  const allkeys = Object.entries(process.env).filter((kv) =>
    kv[0].startsWith("API_KEY_")
  );
  let indexOfCurrentKey = 0;
  for (let i = 0; i < allkeys.length; i++) {
    if (allkeys[i][1] == currentKey) {
      indexOfCurrentKey = i;
      break;
    }
  }
  if (indexOfCurrentKey == allkeys.length - 1) {
    console.log("Quota for all keys expired");
  } else {
    console.log('Moving to next API key')
    apikey = allkeys[indexOfCurrentKey+1][1]
  }
  return apikey
}

module.exports = { failoverApiKey, apikey: process.env.API_KEY_1 };

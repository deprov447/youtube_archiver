const fetchData = require("./fetchData");

function bootstrapIngestion(timeInterval){
    setInterval(()=>{
        const publishedAfter = new Date(Date.now() - 60 * 1000).toISOString();
        fetchData(publishedAfter)
    }, process.env.API_INTERVAL*1000);
}

module.exports = bootstrapIngestion
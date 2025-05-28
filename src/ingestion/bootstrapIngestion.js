const fetchData = require("./fetchData");

function bootstrapIngestion(timeInterval){
    setInterval(fetchData, timeInterval);
}

module.exports = bootstrapIngestion
# Youtube Archiver

# Usage
- Create an `.env.prod` file with following environment variables:
```
DB_URI=<MONGODB URI>

API_KEY_1=<Youtube search API key 1>
API_KEY_2=<Youtube search API key 2>
API_KEY_3=<Youtube search API key 3>
API_KEY_4=<Youtube search API key 4>
API_INTERVAL=<Time gap between subsequent api calls to youtube>

MAX_PAGES_TO_TRAVERSE=<max number of youtube search pages to traverse per batch>
MAX_RESULTS_PER_PAGE=<max results per youtube search pages>

TS_API_KEY=<TypeSense api key>
TS_HOST=<TypeSense host>
TS_PORT=<TypeSense port>
TS_PROTOCOL=<TypeSense protocol (http/https)>

TEST_MODE=<Sets development mode (true/false)>
```
- Place the `.env.prod` file at project root
- `docker-compose up`
- `curl --location 'localhost:4000/results?search_query=neymar&page=1&limit=5'`

# Features

- Fuzzy searching/Full text search
- Support for multiple API keys and automated failover

# Further Developments

The application can be made scalable, where running multiple instances of the application
should allow lower `API_INTERVAL`. These instances can be synced for calling YT API by
providing some sort of distributed lock. A good candidate is Redlock algorithm using redis.
Each instance should acquire a lock before calling YT. The lock release timespan should be 
same as `API_INTERVAL`. And a good point to acquire this lock is the callback function at
`bootstrapIngestion.js`.
../node_modules/.bin/tsc setup.ts --outDir ./src
MONGO_URL="mongodb://mongo:27017/open-pay-db" node ./src/test/setup.js
// TODO format this so it works with both server and services
import { MongoClient, Db } from "mongodb";
const config = {
  URL: process.env.MONGO_URL ?? "mongodb://localhost:27017/open-pay-db",
  dbName: "open-pay-db",
};

const db = (function () {
  let db: Db;
  return {
    async connect() {
      try {
        const client = await MongoClient.connect(config.URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Database connected");
        db = client.db(config.dbName);
        return db;
      } catch (err) {
        throw err;
      }
    },
    getDB() {
      return db;
    },
  };
})();

export default db;

import { MongoClient, Db } from "mongodb";
import config from "../config";

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

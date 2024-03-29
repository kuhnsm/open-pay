import { MongoClient, Db } from "mongodb";
import config from "../config";
import employeeTextSearchIndex from "../config/employeeTextSearchIndex";
import setupTestEmployees from "../test/setup";

function toArray(iterator: any) {
  return new Promise((resolve, reject) => {
    iterator.toArray((err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const db = (function () {
  let db: Db;
  return {
    async setUpDB() {
      const collinfo = await toArray(
        this.getDB().listCollections({ name: "employees" })
      );
      if (!collinfo) {
        await this.getDB().createCollection("employees", {});
      }
      await this.getDB()
        .collection("employees")
        .createIndex(employeeTextSearchIndex);
      // if the environment variable is set, then insert test users.
      console.log("config.setupTestUsersFlag>", config.setupTestUsersFlag);
      if (config.setupTestUsersFlag) {
        await setupTestEmployees();
      }
      console.log("Database setup");
    },
    async connect() {
      try {
        const client = await MongoClient.connect(config.URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Database connected");
        db = client.db(config.dbName);
        await this.setUpDB();
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

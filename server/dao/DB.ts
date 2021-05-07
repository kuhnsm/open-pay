import { MongoClient, Db } from "mongodb";
import config from "../config";
/*
function db() {
  return new Promise((resolve, reject) => {
    const URL = "mongodb://localhost:27017";
    const dbName = "sample";
    MongoClient.connect(URL, (err, client) => {
      if (err) {
        console.log("DB Error", err);
        reject(err);
      }
      console.log("Database connected");
      const db = client.db(dbName);
      resolve(db);
    });
  });
}
*/
/*
const db = (function () {
  let db: Db;
  return {
    connect() {
      return new Promise((resolve, reject) => {
        MongoClient.connect(config.URL, (err, client) => {
          if (err) {
            console.log("DB Error", err);
            reject(err);
          }
          console.log("Database connected");
          db = client.db(config.dbName);
          resolve(db);
        });
      });
    },
    getDB() {
      return db;
    },
  };
})();
export default db;
*/
const db = (function () {
  let db: Db;
  return {
    async connect() {
      /*
      return new Promise((resolve, reject) => {
        MongoClient.connect(config.URL, (err, client) => {
          if (err) {
            console.log("DB Error", err);
            reject(err);
          }
          console.log("Database connected");
          db = client.db(config.dbName);
          resolve(db);
        });
      });
      */
      try {
        const client = await MongoClient.connect(config.URL);
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

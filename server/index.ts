import dotenv from "dotenv";
dotenv.config();
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

import config from "./config";
import db from "./dao/DB";
import routes from "./routes";

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/", "index.html"));
});

async function start() {
  function listen() {
    return new Promise((resolve, reject) => {
      app.listen(config.port, () => {
        console.log(`Server listening on port: ${config.port}`);
        //if(err) {  return reject(err); } //TODO how to catch error
        return resolve(true);
      });
    });
  }
  try {
    await db.connect();
    await listen();
  } catch (e) {
    console.log("Error while starting the server", e);
  }
}
start();

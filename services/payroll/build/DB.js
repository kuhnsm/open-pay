"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// TODO format this so it works with both server and services
const mongodb_1 = require("mongodb");
const config = {
    URL: (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : "mongodb://localhost:27017/open-pay-db",
    dbName: "open-pay-db",
};
const db = (function () {
    let db;
    return {
        connect() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const client = yield mongodb_1.MongoClient.connect(config.URL, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    });
                    console.log("Database connected");
                    db = client.db(config.dbName);
                    return db;
                }
                catch (err) {
                    throw err;
                }
            });
        },
        getDB() {
            return db;
        },
    };
})();
exports.default = db;
//# sourceMappingURL=DB.js.map
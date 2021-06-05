const config = {
  URL: process.env.MONGO_URL ?? "mongodb://localhost:27017/open-pay-db",
  dbName: "open-pay-db",
  port: process.env.PORT,
};
export default config;

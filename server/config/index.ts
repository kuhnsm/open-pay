const config = {
  URL: process.env.MONGO_URL ?? "mongodb://localhost:27017/open-pay-db",
  dbName: "open-pay-db",
  port: process.env.PORT,
  setupTestUsersFlag: process.env.SETUP_TEST_USERS,
};
console.log("config>", config);
export default config;

import db from "../dao/DB";

async function tearDown() {
  await db.connect();
  let results = await db.getDB().collection("employees").deleteMany({});
  console.log(`Deleted ${results?.deletedCount} employees`);
  process.exit(0);
}

tearDown();

const { app } = require("./app");
const { connectDb } = require("./config/db");
const { port } = require("./config/env");

async function start() {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`API listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start API", error);
    process.exit(1);
  }
}

start();

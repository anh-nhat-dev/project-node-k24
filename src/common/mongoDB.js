const mongoose = require("mongoose");
const config = require("config");

require("../apps/models/users");

const uris = config.get("databases.mongo");

mongoose.connect(uris);

mongoose.connection.on("connected", function () {
  console.log(`MongoDB connect successfully!`);
});

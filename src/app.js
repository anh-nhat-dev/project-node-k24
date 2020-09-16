const express = require("express");

const app = express();

app.use("/static", express.static(__dirname + "/public"));

app.use("/", require("./routers/web"));

module.exports = app;

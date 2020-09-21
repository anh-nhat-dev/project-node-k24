const express = require("express");

const app = express();

// Static file
app.use("/static", express.static(__dirname + "/public"));

// Config template egine
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

// Router
app.use("/", require("./routers/web"));

module.exports = app;

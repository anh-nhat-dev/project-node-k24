const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Connect mongoDB
require("./common/mongoDB");

// Static file
app.use("/static", express.static(__dirname + "/public"));

// Body parser: Parser body data sang object và map lại req
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Config template egine
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

// Router
app.use("/", require("./routers/web"));

module.exports = app;

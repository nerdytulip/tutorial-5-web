const express = require("express");
const app = express();
const users = require("./users");
app.use(express.json());
app.use("", users);
module.exports = app;

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const axios = require('axios');

app.use(express.static(path.join(__dirname, "/../build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/../build", "index.html"));
});

app.get("/search", async (req, res) => {
  const {term, offset } = req.query;
  const response = await axios.get(`https://itunes.apple.com/search?term=${term}&limit=10&media=music&offset=${offset}`);
  return res.send(JSON.stringify(response.data.results));
});

app.listen(process.env.PORT || 8080);

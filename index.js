const express = require("express");
const { streamingTweets, getTweet } = require("./public/bot");

const app = express();
const PORT = process.env.PORT || 3000
const HOST = "0.0.0.0";
const cors = require("cors");
var path = require("path");

app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:7777"]
    })
  );
app.use(express.static(path.join(__dirname, 'public')));

var tweets = []
app.get("/", (req, res) => {
  // res.render('index.jade')
  res.sendFile(__dirname +'/index.html');
  // res.send(tweets)
  });
app.listen(PORT, HOST);
streamingTweets(tweets,'Trade War')

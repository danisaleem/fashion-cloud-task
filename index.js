const express = require("express");
const app = express();
const port = process.env.PORT || 8089;

app.get("/", (req, res) => {
  res.send("Welcome to Fashion Cloud Technical Task!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

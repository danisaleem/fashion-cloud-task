const express = require("express");
const cacheRoutes = require("./src/routes/cache.routes.js");

const app = express();
const port = process.env.PORT || 8091;

// parse requests of content-type - application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to Fashion Cloud Technical Task!");
});

app.use("/cache", cacheRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

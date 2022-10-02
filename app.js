const express = require("express");
const cacheRoutes = require("./src/routes/cache.routes.js");

const app = express();
const port = process.env.PORT || 8091;

// parse requests of content-type - application/json
app.use(express.json());

// log all endpoints
app.all("*", (req, res, next) => {
  console.log({ method: req.method, url: req.url });
  next();
});

app.get("/", (req, res) => {
  res.json("Welcome to Fashion Cloud Technical Task!");
});

app.use("/cache", cacheRoutes);

// If No route matches then handle invalid requests here
app.all("*", (req, res) => {
  res.status(404).send({
    message: "The resource you are looking for does not exist.",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

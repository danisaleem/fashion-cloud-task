const db = require("../models/index.js");
const { v4: uuidv4 } = require("uuid");
const Cache = db.Cache;

// Create and Save a new Cache
exports.create = (req, res) => {
  // Validate request

  if (!req.body.value) {
    res.status(400).send({ message: "value can not be empty!" });
    return;
  }

  // Create a Cache
  const cache = new Cache({
    key: uuidv4(),
    value: req.body.value,
  });

  // Save Cache in the database
  cache
    .save(cache)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Cache.",
      });
    });
};

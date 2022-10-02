const db = require("../models/index.js");
const { v4: uuidv4 } = require("uuid");
const Cache = db.Cache;

const createCache = (_value) => {
  // Create a Cache
  const cache = new Cache({
    value: _value,
  });

  // Save Cache in the database
  return cache.save(cache);
};

// returns the cached data for a given key
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    // param validation
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid key");
    }

    let retrievedCache;

    await Cache.findById(id).then((data) => {
      retrievedCache = data;
    });

    if (!retrievedCache) {
      console.log("Cache miss");

      createCache(uuidv4())
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send({
            message: "something went wrong",
          });
        });
    } else {
      console.log("Cache hit");
      res.send(retrievedCache);
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "something went wrong",
    });
  }
};

// returns all stored keys in the cache
exports.findAll = (req, res) => {
  const condition = {}; // no condition, findAll

  Cache.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        message: "something went wrong",
      });
    });
};

// create and update the data for a given key
exports.createOrUpdate = async (req, res) => {
  try {
    const id = req.body.id;
    const value = req.body.value;

    // validation
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid key");
    }

    const filter = { _id: id };
    const update = { value: value };

    const cache = await Cache.findOneAndUpdate(filter, update, {
      new: true, // returnns newly created cache
      upsert: true, // Make this update into an upsert
    });

    res.send(cache);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "something went wrong",
    });
  }
};

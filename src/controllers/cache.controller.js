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
          return res.status(500).send({
            message: "something went wrong",
          });
        });
    } else {
      console.log("Cache hit");
      res.send(retrievedCache);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      message: "something went wrong",
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
      return res.status(500).send({
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
    console.log(err.message);
    return res.status(500).send({
      message: "something went wrong",
    });
  }
};

// removes a given key from the cache
exports.delete = (req, res) => {
  const id = req.params.id;

  Cache.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cache not found!`,
        });
      } else {
        res.send({
          message: "Cache was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send({
        message: "something went wrong",
      });
    });
};

const cacheController = require("../controllers/cache.controller");
const express = require("express");
const router = express.Router();

// returns the cached data for a given key
router.get("/:id", cacheController.findOne);

// returns all stored keys in the cache
router.get("/", cacheController.findAll);

// create and update the data for a given key
router.post("/", cacheController.createOrUpdate);

// removes a given key from the cache
router.delete("/:id", cacheController.delete);

// removes all keys from the cache
router.delete("/", cacheController.deleteAll);

module.exports = router;

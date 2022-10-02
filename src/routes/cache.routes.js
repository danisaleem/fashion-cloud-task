const cacheController = require("../controllers/cache.controller");
const express = require("express");
const router = express.Router();

// Create a new Cache entry
router.post("/", cacheController.create);

module.exports = router;

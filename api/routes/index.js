const express = require("express");
const movies = require("./movies");
const tv = require("./tv");
const user = require("./user");
const router = express.Router();

router.use("/movie", movies);
router.use("/tv", tv);
router.use("/user", user);

module.exports = router;

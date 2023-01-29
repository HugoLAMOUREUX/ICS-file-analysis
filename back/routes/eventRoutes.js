const express = require("express");
const { set } = require("mongoose");
const router = express.Router();
const { setEvent, getCorpus } = require("../controllers/eventController");

router.post("/", setEvent).get("/", getCorpus);

module.exports = router;

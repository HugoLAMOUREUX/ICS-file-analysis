const asyncHandler = require("express-async-handler");
var latinize = require("latinize");
const Event = require("../models/eventModel");

const setEvent = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.class) {
    res.status(400);
    throw new Error("Please add the name and the class of the activity");
  }

  let outputEvent = {};
  outputEvent[req.body.class] = 1;
  let inputObject = {};

  //fill inputObject in the correct format
  req.body.name.split(" ").map((e) => {
    lat = latinize(e).toLowerCase();
    inputObject[lat] = 1;
  });

  const event = await Event.create({
    input: inputObject,
    output: outputEvent,
  });

  res.status(200).json(event);
});

const getCorpus = asyncHandler(async (req, res) => {
  const corpus = await Event.find();
  res.status(200).json(corpus);
});
module.exports = { setEvent, getCorpus };

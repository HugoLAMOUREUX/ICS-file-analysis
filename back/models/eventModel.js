const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    input: {
      type: mongoose.SchemaTypes.Mixed,
      required: [true, "Please add the name of an event"],
    },
    output: {
      type: mongoose.SchemaTypes.Mixed,
      required: [true, "Please add the class of an event"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Event", eventSchema);

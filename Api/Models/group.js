"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

module.exports = mongoose.model("Groups", GroupSchema);

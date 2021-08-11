"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  title: {
    type: String,
    required: "Title is required",
  },

  created_date: {
    type: Date,
    default: Date.now,
  },

  due_date: {
    type: Date,
    default: Date.now,
  },

  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Groups",
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);

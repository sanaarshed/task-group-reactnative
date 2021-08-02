"use strict";

var mongoose = require("mongoose");
const group = mongoose.model("Groups");

exports.all = function (req, res) {
  console.log(group.schema);
  return res.json();
};
exports.show = function (req, res) {
  return res.json();
};

exports.create = function (req, res) {
  return res.json();
};

exports.update = function (req, res) {
  return res.json();
};
exports.delete = function (req, res) {
  return res.json();
};

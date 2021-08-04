"use strict";

const mongoose = require("mongoose");
const Task = mongoose.model("Task");
const ApiResponse = require("../Models/apiResponse");

exports.all = function (req, res) {};
exports.show = function (req, res) {};
exports.create = function (req, res) {
  const groupId = req.params.groupId;
};
exports.update = function (req, res) {};
exports.delete = function (req, res) {};

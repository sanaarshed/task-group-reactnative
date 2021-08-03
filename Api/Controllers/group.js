"use strict";

var mongoose = require("mongoose");
var ApiResponse = require("../Models/apiResponse");

const group = mongoose.model("Groups");

exports.all = function (req, res) {
  try {
    group.find({}, function (err, data) {
      if (err) res.json(new ApiResponse(null, err, false));
      const groups = data.map((element) => {
        return {
          id: element.id,
          name: element.name,
          createdDate: element.created_date,
          tasks: element.tasks,
        };
      });

      res.json(new ApiResponse(groups, "Data retreved"));
    });
  } catch (e) {
    return res.json(new ApiResponse(null, e.message, false));
  }
};
exports.show = function (req, res) {
  try {
    group.findById(req.params.groupId, function (err, data) {
      if (err) return res.json(new ApiResponse(null, err, false));
      const group = {
        id: data.id,
        name: data.name,
      };
      return res.json(new ApiResponse(group, "Data retreved"));
    });
  } catch (e) {
    return res.json(new ApiResponse(null, e.message, false));
  }
};

exports.create = function (req, res) {
  // ....
  try {
    var data = new group(req.body);
    data.save(function (err, data) {
      if (err) return res.json(new ApiResponse(null, "Data not saved.", false));
      const group = {
        id: data.id,
        name: data.name,
      };
      return res.json(new ApiResponse(group, "Record saved successfully"));
    });
  } catch (e) {
    return res.status(500).json(new ApiResponse(null, e.message, false));
  }
};

exports.update = function (req, res) {
  try {
    group.findOneAndUpdate(
      { _id: req.params.groupId },
      req.body,
      { new: true },
      function (err, data) {
        if (err) return res.json(new ApiResponse(data, err, false));
        return res.json(new ApiResponse(data, "Record Updated"));
      }
    );
  } catch (e) {
    return res.json(new ApiResponse(null, e.message, false));
  }
};

exports.delete = function (req, res) {
  group.remove({ _id: req.params.groupId }, function (err, data) {
    if (err) return res.json(new ApiResponse(null, err, false));
    return res.json(new ApiResponse(null, "Record deleted"));
  });
};

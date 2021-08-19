"use strict";

const mongoose = require("mongoose");
const Group = mongoose.model("Groups");
const ApiResponse = require("../Models/apiResponse");

exports.showAll = async function (req, res) {
  try {
    const { groupId } = req.params;
    await Group.findById(
      { _id: mongoose.Types.ObjectId(groupId) },
      function (err, d) {
        if (d) {
          d = d.tasks;
          return res.json(new ApiResponse(d, "Data retreved"));
        } else {
          {
            return res.json(
              new ApiResponse(null, "Error retrieving data.", false)
            );
          }
        }
      }
    );
  } catch (e) {
    return res.json(new ApiResponse(null, e.message, false));
  }
};
exports.show = async function (req, res) {
  try {
    const { groupId } = req.params;
    const { taskId } = req.params;

    await Group.findById(groupId).then((g) => {
      var task = g.tasks.find((m) => m._id == taskId);

      if (res) {
        return res.json(new ApiResponse(task, "Data retrieved."));
      } else {
        return res.json(new ApiResponse(null, "Error retrieving data.", false));
      }
    });
    // return res.json();
  } catch (e) {
    return res.json(new ApiResponse(null, e.message, false));
  }
};

exports.create = async function (req, res) {
  try {
    const { groupId } = req.params;

    const _task = {
      title: req.body.title,
      due_date: req.body.due_date,
      ischecked: req.body.ischecked,
    };

    console.log(_task);

    await Group.findOneAndUpdate(
      { _id: groupId },
      {
        $addToSet: {
          tasks: _task,
        },
      },
      function (err, result) {
        if (err)
          return res.json(new ApiResponse(null, "Data not Saved.", false));
        else
          return res.json(new ApiResponse(_task, "Record saved successfully"));
      }
    );
  } catch (e) {
    return res.json(new ApiResponse(null, e.message, false));
  }
};

exports.update = async function (req, res) {
  try {
    const groupId = req.params.groupId;
    const taskId = req.params.taskId;

    // console.log(groupId, req.body.title, taskId);
    await Group.findOneAndUpdate(
      {
        _id: groupId, // gId,
        //  this was the statement that was not working tasks: { "tasks.1._id": taskId },
        tasks: {
          $elemMatch: {
            _id: taskId, //tId,
            // _id: mongoose.Types.ObjectId(taskId),
          },
        },
      },
      {
        $set: {
          "tasks.$.title": req.body.title + " ",
          "tasks.$.due_date": req.body.due_date,
          "tasks.$.ischecked": req.body.ischecked,
        },
      },
      // {"arrayFilters": [{ "outer.id": itemId }]},
      {
        new: true,
        safe: true,
        upsert: false,
      },
      async function (err, data) {
        if (err)
          return res.json(new ApiResponse(data, "Data not Updated.", false));
        else
          return await res.json(
            new ApiResponse(data, "Record Updated successfully")
          );
      }
    ).catch((e) => console.log("Error Updated in Controler"));
    // .then((res) => {
    //   then returning the whole group object;
    // });

    // await Group.findById(groupId).then((g) => {
    //   var t = g.tasks.find((m) => m._id == taskId);
    //   var i = g.tasks.indexOf(t);
    //   t.title = data;
    //   g.tasks[i] = t;
    //   console.log(g);
    //   g.save(function (err, obj) {

    //   });

    // g.save();
    // console.log(g);
    // });
    // return res.json();
  } catch (e) {
    return res.json(new ApiResponse(null, e.message, false));
  }
};
exports.delete = async function (req, res) {
  try {
    // const gId = "611235447685323a18d070ba";
    // const tId = "611235537685323a18d070bc";
    const { groupId } = req.params;
    const { taskId } = req.params;
    await Group.findOneAndUpdate(
      { _id: groupId },
      {
        $pull: {
          tasks: { _id: taskId },
          // results: { $elemMatch: { _id: mongoose.Types.ObjectId(taskId) } },
        },
      },
      function (err, data) {
        if (data)
          return res.json(
            new ApiResponse(data, "Record deleted successfully ")
          );
        else {
          new ApiResponse(null, "Error deleting", false);
        }
      }
    );
  } catch (e) {
    return res.json(new ApiResponse(null, e.message, false));
  }
};

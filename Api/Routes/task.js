// TASK ROUTES (END POINTS)
// GET:     groups/{groupId}/tasks,
// POST:    groups/{groupId}/tasks

// GET:     groups/(groupId)/tasks/{taskId}
// PUT:     groups/{groupId}/tasks/{taskId}
// DELETE:  groups/{groupId}/tasks/{taskId}

"use strict";
module.exports = function (app) {
  app
    .route("/groups/:groupId/tasks")
    .get(function (req, res) {
      return res.json("get all tasks");
    })
    .post(function (req, res) {
      return res.json("post a task");
    });

  app
    .route("/groups/:groupId/tasks/:taskId")
    .get(function (req, res) {
      return res.json("task id " + req.params.taskId);
    })
    .put(function (req, res) {
      return res.json("update task of id" + req.params.taskId);
    })
    .delete(function (req, res) {
      return res.json(
        "update, task of id:" +
          req.params.taskId +
          "groupID : " +
          req.params.groupId
      );
    });
};

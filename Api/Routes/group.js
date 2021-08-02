// GROUPS ROUTES
// GET:    groups
// POST:   groups

// GET:    groups/{groupId}
// PUT:    groups/{groupId}
// DELETE: groups/{groupId}

"use strict";
module.exports = function (app) {
  // var todoList = require('../controllers/todoListController');
  //   app.route('/tasks/:taskId')
  //     .get(todoList.read_a_task)
  //     .put(todoList.update_a_task)
  //     .delete(todoList.delete_a_task);

  app
    .route("/groups")
    .get(function (req, res) {
      return res.json("get all records");
    })
    .post(function (req, res) {
      return res.json("post successfully");
    });

  app
    .route("/groups/:groupId")
    .get(function (req, res) {
      const id = req.params.groupId;
      return res.json();
    })
    .put(function (req, res) {
      return res.json("update the single record id " + req.params.groupId);
    })
    .delete(function (req, res) {
      return res.json("delete one record of id: " + req.params.groupId);
    });
};

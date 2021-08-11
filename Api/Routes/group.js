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

  var controller = require("../Controllers/group");

  app.route("/groups").get(controller.showAll).post(controller.create);

  app
    .route("/groups/:groupId")
    .get(controller.show)
    .put(controller.update)
    .delete(controller.delete);

  // app
  // .route("/groups/:groupId/tasks")
};

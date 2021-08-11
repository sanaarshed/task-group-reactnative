// TASK ROUTES (END POINTS)
//GET:     groups/{gr}

// GET:     groups/{groupId}/tasks,
// POST:    groups/{groupId}/tasks

// GET:     groups/(groupId)/tasks/{taskId}
// PUT:     groups/{groupId}/tasks/{taskId}
// DELETE:  groups/{groupId}/tasks/{taskId}

"use strict";
const controller = require("../Controllers/task");

module.exports = function (app) {
  app
    .route("/groups/:groupId/tasks")
    .get(controller.showAll)
    .post(controller.create);

  app
    .route("/groups/:groupId/tasks/:taskId")
    .get(controller.show)
    .put(controller.update)
    .delete(controller.delete);
};

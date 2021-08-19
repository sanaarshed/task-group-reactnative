// GROUPS ROUTES
// GET:    groups
// POST:   groups

// GET:    groups/{groupId}
// PUT:    groups/{groupId}
// DELETE: groups/{groupId}

"use strict";
module.exports = function (app) {
  var controller = require("../Controllers/group");

  app.route("/groups").get(controller.showAll).post(controller.create);

  app
    .route("/groups/:groupId")
    .get(controller.show)
    .put(controller.update)
    .delete(controller.delete);
};

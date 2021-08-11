"use strict";

module.exports = class TaskService {
  constructor() {
    (this.apiUrl = "http://192.168.10.10:3000"),
      (this.endPointGroups = this.apiUrl + "/groups");
    this.endPointTasks = "/tasks";
  }

  async create(data, groupId) {
    const url = this.endPointGroups + "/" + groupId + "/tasks";
    var response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    var json = await response.json();
    return json;
  }

  async showAll(groupID) {
    const url = this.endPointGroups + "/" + groupID + "/tasks";

    var res = await fetch(url, {
      method: "GET",
    });
    var json = await res.json();
    return json;
  }
};

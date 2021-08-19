"use strict";

module.exports = class TaskService {
  constructor() {
    this.apiUrl = "https://sana-todo-api.herokuapp.com/groups/";
  }

  async create(data, groupId) {
    console.log(data);
    const url = this.apiUrl + groupId + "/tasks";
    var response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    var json = await response.json();
    return json;
  }

  async showAll(groupID) {
    const url = this.apiUrl + groupID + "/tasks";

    var res = await fetch(url, {
      method: "GET",
    });
    var json = await res.json();
    return json;
  }
};

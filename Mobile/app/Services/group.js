"use strict";

module.exports = class GroupService {
  constructor() {
    this.apiUrl = "http://192.168.10.10:3000";
    this.endPoint = this.apiUrl + "/groups";
  }
  async create(data = {}) {
    try {
      return await fetch(this.endPoint, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    } catch (e) {
      console.log("exception in group service create  -->  ", e);
    }
  }
  async showAll() {
    var response = await fetch(
      this.endPoint
      // , { headers: { "Content-Type": "application/json" }, }
    );

    var json = await response.json();
    return json;
  }
  async update(data, id) {
    const url = this.endPoint + "/" + id;

    return await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // body: JSON.stringify(data),
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data : ", data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async delete(id) {
    const url = this.endPoint + "/" + id;

    return await fetch(url, {
      method: "DELETE",
    }).then((res) => {
      return res.json();
    });
  }
};

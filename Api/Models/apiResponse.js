"use strict";

module.exports = class ApiResponse {
  constructor(data, message, isSuccess = true) {
    this.data = data;
    this.message = message;
    this.isSuccess = isSuccess;
  }
};

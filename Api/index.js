var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

var taskRoutes = require("./Routes/task"); //importing route
taskRoutes(app); //register the route

var groupRoutes = require("./Routes/group"); //importing route
groupRoutes(app); //register the route

app.listen(port);

console.log("todo list RESTful API server started on: " + port);

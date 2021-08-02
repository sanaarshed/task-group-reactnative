var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  Group = require("./Models/group"),
  Task = require("./Models/task"),
  port = process.env.PORT || 3000;

var taskRoutes = require("./Routes/task"); //importing route
var groupRoutes = require("./Routes/group"); //importing route

// Routes Configuration
taskRoutes(app); //register the route
groupRoutes(app); //register the route

// Mongo Connection
const mongoUri =
  "mongodb+srv://grouptaskappdbuser:aubhPQVdNp8Z7X8M@cluster0.uphxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(
  mongoUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("mongo atlas connected");
  }
);

app.listen(port);
console.log("API server started on: " + port);

var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  Task = require("./Models/task"),
  Group = require("./Models/group"),
  port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//importing route/endpoints
var taskRoutes = require("./Routes/task");
var groupRoutes = require("./Routes/group");

// Routes Configuration
taskRoutes(app); //register the route
groupRoutes(app);
//Heroku

// Mongo Connection
const mongoUri =
  "mongodb+srv://grouptaskappdbuser:aubhPQVdNp8Z7X8M@cluster0.uphxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(
  mongoUri,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("mongo atlas connected");
  }
);

app.listen(port);
console.log("API server started on: " + port);

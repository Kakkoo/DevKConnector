const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const app = express();

//Body parser configuration
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//First route
app.get("/", (req, res) => res.send("Hello world!"));

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = 7000;
app.listen(port, () => console.log(`Server running on port ${port}`));
//Db config
const db = require("./config/keys").mongoURI;
//Connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log(err));
//Passport congiguration
app.use(passport.initialize());
require('./config/passport')(passport);
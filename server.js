require("dotenv/config");
const dotenv = require('dotenv').config()
const express = require("express");
const session = require("express-session");
const sequelize = require("./config/connection");
const Store = require("connect-session-sequelize")(session.Store);
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  saveUninitialized: false,
  store: new Store({
    db: sequelize,
  }),
};

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use("/", require("./controllers"));

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});

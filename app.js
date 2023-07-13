const express = require("express");
const { createConnection } = require("mysql2");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connection = createConnection({
  host: "127.0.0.1",
  user: "root",
  // password: "",
  database: "task_db",
});

connection.connect(function (err) {
  if (err) {
    console.log("err", err);
  } else {
    console.log("Connected to the database.");
  }
});

app.get("/", function (req, res) {
  connection.query("SELECT * FROM tasks", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.render("list", {
      kindOfDay: date.getDate(),
      newListedItem: results,
    });
  });
});

app.post("/", function (req, res) {
  connection.query(
    "INSERT INTO tasks (tasks_col) VALUES (?)",
    [req.body.newItem],
    function (err, results) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );
});

app.post("/delete", function (req, res) {
  const checkedItemID = req.body.checkbox;
  connection.query(
    "DELETE FROM tasks WHERE tasks_col = ?",
    [checkedItemID],
    function (err, results) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );
});

app.post("/search-box", function (req, res) {
  const searchedItem = req.body.searchedItem;
  connection.query(
    "SELECT * FROM tasks WHERE tasks_col LIKE ?",
    [`%${searchedItem}%`],
    function (err, results) {
      if (err) {
        console.log(err);
      }
      res.render("list", {
        kindOfDay: date.getDate(),
        newListedItem: results,
      });
    }
  );
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3001, function () {
  console.log("Server has started on port 3001");
});

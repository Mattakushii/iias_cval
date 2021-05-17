const mysql = require("mysql");

const db = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user: "sql11409981",
  password: "feya1QmzGv",
  database: "sql11409981",
});

db.connect((err) => {
  if (err) {
    return console.log("Something wrong", err);
  } else {
    console.log("Let's go!");
  }
});

module.exports = db;

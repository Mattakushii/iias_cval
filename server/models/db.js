const mysql = require("mysql");

const logger = require('../models/log4js')

const db = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user: "sql11409981",
  password: "feya1QmzGv",
  database: "sql11409981",
});

db.connect((err) => {
  if (err) {
    return console.log("Something wrong with database", err);
  } else {
    logger.info("Database successeful started");
  }
});

module.exports = db;

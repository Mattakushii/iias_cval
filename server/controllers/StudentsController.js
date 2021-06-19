const db = require("../models/db");
const logger = require("../models/log4js");

module.exports = {
  getStudent: (req, res) => {
    const userId = req.headers["id"];
    console.log(userId)
    db.query(
      `SELECT first_name, second_name, is_auth FROM students WHERE id = '${userId}'`,
      (err, result) => {
        if (!err) {
          logger.debug(result)
          res.json(result);
        } else {
          res.json({ dbError: true, message: "Database error" });
        }
      }
    );
  },
  getExample: (req, res) => {
    console.log('example')
  }
};

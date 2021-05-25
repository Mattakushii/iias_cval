const db = require("../models/db");

module.exports = {
  getAllStudents: (req, res) => {
    db.query(
      "SELECT first_name, second_name, is_auth FROM students",
      (err, result) => {
        if (!err) {
          res.json(result);
        } else {
          res.json({ dbError: true, message: "Database error" });
        }
      }
    );
  },
};

const express = require("express");
const app = express();
const db = require("./settings/db");
const PORT = process.env.PORT || 3001;

app.get("/api/students", (req, res) => {
  db.query(
    "SELECT first_name, second_name, is_auth FROM students",
    (err, result) => {
      res.json(result);
    }
  );
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

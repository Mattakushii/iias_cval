const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const db = require("./settings/db");
const PORT = process.env.PORT || 3001;

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    console.log("Token not found");
    res.send("Token not found");
  } else {
    jwt.verify(token, "zxc", (err) => {
      if (err) {
        console.log("Token not found");
        res.send({ isAuth: false, mes: "Token error" });
      } else {
        res.send({ isAuth: true, mes: "Token proceed" });
        next();
      }
    });
  }
};

app.use(express.json());

const findUser = (login, password) => {
  return `SELECT * FROM students WHERE login = "${login}" AND password = "${password}"`;
};

app.get("/api/students", (req, res) => {
  db.query(
    "SELECT first_name, second_name, is_auth FROM students",
    (err, result) => {
      res.json(result);
    }
  );
});

app.get("/api/isAuth", verifyJWT, (req, res) => {
  res.send("Auth success");
});

app.post("/api/login", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  db.query(findUser(login, password), (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      const token = jwt.sign({ id: result.id }, "zxc", { expiresIn: 240 });
      res.json({
        isAuth: true,
        first_name: result[0].first_name,
        second_name: result[0].second_name,
        token: token,
      });
    } else {
      res.send("Unknown user");
    }
  });
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

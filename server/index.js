const express = require("express");
const app = express();

const useSocket = require("socket.io")
const server = require('http').Server(app)
const io = useSocket(server)

const db = require("./settings/db");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3001;

const verifyJWT = (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    console.log("Token not found");
  } else {
    jwt.verify(token, "zxc", (err) => {
      if (err) {
        console.log("Token not valid");
        return res.send({ isAuth: false, message: "Token error" });
      } else {
        return res.send({ isAuth: true, message: "Token proceed" });
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
      if (!err) {
        res.json(result);
      } else {
        res.json({ dbError: true, message: "Database error" });
      }
    }
  );
});

app.get("/api/isAuth", verifyJWT, (req, res) => {
  res.send("Auth success");
});

io.on('connection', socket => {
  console.log("socket ready", socket)
})

app.post("/api/login", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  db.query(findUser(login, password), (err, result) => {
    if (err) {
      console.log("1")
      return res.send({ err: err });
    } else 

    if (result.length > 0) {
      console.log("2")
      const token = jwt.sign({ id: result.id }, "zxc", { expiresIn: 240 });
      return res.json({
        isAuth: true,
        first_name: result[0].first_name,
        second_name: result[0].second_name,
        token: token,
      });
    } else {
      console.log("3")
      return res.json({ isAuth: false, message: "invalid user or password" });
    }
  });
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

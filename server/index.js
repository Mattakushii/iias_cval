const express = require("express");
const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server,{
  cors:{
    origin: 'http://localhost:3000',
    method: ["GET", "POST"],
    allowEIO3: true
  }})

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
  console.log('Auth checked')
  res.send("Auth success");
});

io.on('connection', socket => {
  console.log("socket ready", socket.id)
})

io.on('disconnect', socket => {
  console.log(`user disconnect from chat, ${socket.id}`)
})

app.post("/api/login", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  db.query(findUser(login, password), (err, result) => {
    if (err) {
      console.log("Database error")
      return res.send({ err: err });
    }

    if (result.length > 0) {
      console.log("Login success")
      const token = jwt.sign({ id: result.id }, "zxc", { expiresIn: 10000 });
      db.query(
        `UPDATE students SET token = "${token}" WHERE login = "${login}" AND password = "${password}"`,
        (err, result) => {
          if (!err) {
            console.log("Token db update")
          } else {
            console.log("Token update error")
          }
        }
      )
      return res.json({
        isAuth: true,
        id: result[0].id,
        first_name: result[0].first_name,
        second_name: result[0].second_name,
        token: token,
      });
    } else {
      console.log("Login auth error")
      return res.json({ isAuth: false, message: "invalid user or password" });
    }
  });
});

app.get('/api/showchats', (req, res) => {
  const token = req.headers.token
  console.log(token)

  db.query(
    `SELECT chats.id, chats.name FROM chats,students,chat_user WHERE students.token = "${token}" AND chat_user.user_id = students.id AND chat_user.chat_id = chats.id`,
    (err, result) => {
      if (!err) {
        console.log('messages set')
        console.log(result)
        res.json(result)
      } else {
        console.log('messages not set')
        res.status(500).json({messagesSet: false, messages: "Something wrong"})
      }
    }
  )
})

server.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

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
  socket.on('sendmessage', ({token, messageSend, chatid}) => {
    db.query(
      `SELECT id FROM students WHERE token = "${token}"`,
      (err, result) => {
        if (!err) {
          userid = result[0].id
          db.query(
            `INSERT INTO message (id, user_id, chat_id, message) VALUES (NULL, "${userid}", "${chatid}", "${messageSend}")`,
            (err, result) => {
              if (err) {
                console.log("message send error")
              } else {
                console.log("message send")
              }
            }
          )}
      } 
    )
  })
  
  socket.on('showmessage', (dialog) => {
    let messageSet = []
  
    console.log(dialog)
  
    db.query(
      `SELECT * FROM message WHERE chat_id = ${dialog}`,
      (err, result) => {
        if (!err) {
          result.map((obj, index) => {
            messageSet = [...messageSet, {position: 'right', type: 'text', text: obj.message}]
          })
          console.log(messageSet)
          socket.emit('showmessage', messageSet)
        } else {
          console.log('messages dont load')
        }
      }
    )
  })
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
  let chatList = []
  
  console.log(token)

  db.query(
    `SELECT chats.id, chats.name FROM chats,students,chat_user WHERE students.token = "${token}" AND chat_user.user_id = students.id AND chat_user.chat_id = chats.id`,
    (err, result) => {
      if (!err) {
        console.log('messages set')
        result.map((obj, index) => {
          chatList = [...chatList, {avatar: "https://i.pravatar.cc/50", alt: obj.id, title: obj.name, date: "none"}]
        })
        res.json(chatList)
      } else {
        console.log('messages not set')
        res.status(500).json({messagesSet: false, messages: "Something wrong"})
      }
    }
  )
})

app.get('/api/showmessages', (req, res) => {
  const chatId = req.headers.chatid
  let messageSet = []

  console.log(chatId)

  db.query(
    `SELECT * FROM message WHERE chat_id = ${chatId}`,
    (err, result) => {
      if (!err) {
        console.log(result)
        result.map((obj, index) => {
          messageSet = [...messageSet, {position: 'right', type: 'text', text: obj.message}]
        })
        res.send(messageSet)
      } else {
        console.log('messages dont load')
      }
    }
  )

})

app.post('/api/sendmessage', (req, res) => {
  const message = req.body.message
  const chatId = req.body.chatid
  const token = req.body.token
  var userid = 0


  if (chatId == 0) {
    return res.json(
      {
        message: "Choose dialog"
      }
    )
  }

  db.query(
    `SELECT id FROM students WHERE token = "${token}"`,
    (err, result) => {
      if (!err) {
        userid = result[0].id
        db.query(
          `INSERT INTO message (id, user_id, chat_id, message) VALUES (NULL, "${userid}", "${chatId}", "${message}")`,
          (err, result) => {
            if (err) {
              console.log("message send error")
            } else {
              console.log("message send")
            }
          }
        )}
    } 
  )

  console.log({message: message, chatid: chatId, token: token, userid: userid})

})

server.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

const express = require("express");
const app = express();
const db = require("./models/db");

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
    allowEIO3: true,
  },
});

const logger = require("./models/log4js");

const authRoute = require("./routes/Auth");
const studentsRoute = require("./routes/Students");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", authRoute);
app.use("/api", studentsRoute);

app.get("/api/showchats", (req, res) => {
  let chatList = [];
  const token = req.headers.token;

  db.query(
    `SELECT chats.id, chats.name FROM chats,students,chat_user WHERE students.token = "${token}" AND chat_user.user_id = students.id AND chat_user.chat_id = chats.id`,
    (err, result) => {
      if (!err) {
        logger.debug(result);
        logger.info("messages set");

        result.map((obj, index) => {
          chatList = [
            ...chatList,
            {
              avatar: "https://i.pravatar.cc/50",
              alt: obj.id,
              title: obj.name,
              date: "none",
            },
          ];
        });
        res.json(chatList);
      } else {
        logger.error("messages not set");
        res
          .status(500)
          .json({ messagesSet: false, messages: "Something wrong" });
      }
    }
  );
});

io.on("connection", (socket) => {
  logger.info("socket ready", socket.id);

  socket.on("sendmessage", ({ token, message, chatid }) => {
    let messageSet = [];

    db.query(
      `SELECT id FROM students WHERE token = "${token}"`,
      (err, result) => {
        if (!err) {
          console.log(result);
          userid = result[0].id;
          db.query(
            `INSERT INTO message (id, user_id, chat_id, message) VALUES (NULL, "${userid}", "${chatid}", "${message}")`,
            (err, result) => {
              if (err) {
                logger.error("message send error");
              } else {
                logger.info("message send");
                db.query(
                  `SELECT * FROM message WHERE chat_id = ${chatid}`,
                  (err, result) => {
                    if (!err) {
                      result.map((obj, index) => {
                        messageSet = [
                          ...messageSet,
                          {
                            position: "right",
                            type: "text",
                            text: obj.message,
                          },
                        ];
                      });
                      logger.debug(messageSet);
                      io.emit("showmessage", messageSet);
                    } else {
                      logger.error("messages dont load");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });

  socket.on("show_chats", ({ token }) => {
    let chatList = [];

    db.query(
      `SELECT chats.id, chats.name FROM chats,students,chat_user WHERE students.token = "${token}" AND chat_user.user_id = students.id AND chat_user.chat_id = chats.id`,
      (err, result) => {
        if (!err) {
          logger.debug(result);
          logger.info("messages set");

          result.map((obj, index) => {
            chatList = [
              ...chatList,
              {
                avatar: "https://i.pravatar.cc/50",
                alt: obj.id,
                title: obj.name,
                date: "none",
              },
            ];
          });
          socket.emit("show_chats", chatList);
        } else {
          logger.error("messages not set");
          res
            .status(500)
            .json({ messagesSet: false, messages: "Something wrong" });
        }
      }
    );
  });

  socket.on("showmessage", (dialog) => {
    let messageSet = [];

    logger.debug(dialog);

    db.query(
      `SELECT * FROM message WHERE chat_id = ${dialog}`,
      (err, result) => {
        if (!err) {
          result.map((obj, index) => {
            messageSet = [
              ...messageSet,
              { position: "right", type: "text", text: obj.message },
            ];
          });
          // logger.debug(messageSet)
          socket.emit("showmessage", messageSet);
        } else {
          logger.error("messages dont load");
        }
      }
    );
  });

  socket.on("disconnect", () => {
    logger.info(`Socket user ${socket.id} disconnect`);
  });
});

server.listen(PORT, () => {
  logger.info("Server started on port " + PORT);
});

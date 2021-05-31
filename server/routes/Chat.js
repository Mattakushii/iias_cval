const express = require("express");
const chat = express.Router();


chat.get('/showchats', (req, res) => {
    let chatList

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
    })
})
import React, { useEffect, useState } from "react";
import socket from "../../core/socket";
import { ChatNav } from "./UI/chat-nav";
import { ChatDisplay } from "./UI/chat-display";
import { ChatContext } from "./chat-context";

export const ChatScreen = () => {
  const [dialog, setDialog] = useState(0);
  const [message, setMessage] = useState('')

  const insertMessage = (e) => {
    const token = localStorage.getItem("token")
    const chatid = dialog
    const date = new Date()
    socket.emit('sendmessage', ({token, message, chatid, date}))
    setMessage('')
  }

  useEffect(() => {
    socket.connect();
    return () => socket.disconnect()
  }, []);

  return (
    <>
      <h1>Chat</h1>
      <div className="chat__wrapper">
        <ChatContext.Provider value={[dialog, setDialog]}>
          <ChatNav />
          <ChatDisplay />
        </ChatContext.Provider>
      </div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)}>
      </textarea>
      <button onClick={insertMessage}>Отправить</button>
    </>
  );
};

import React, { useEffect, useState } from "react";
import socket from "../../core/socket";
import { ChatNav } from "./UI/chat-nav";
import { ChatDisplay } from "./UI/chat-display";
import { ChatContext } from "./chat-context";
import { Menu } from "../menu/menu";
import { Header } from "../header/header";

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
      <Menu/>
      <Header/>

      <div className="messages">
          <ChatContext.Provider value={[dialog, setDialog]}>
            <div className="messages-name">
              <input className="messages-search" type="text" placeholder="Поиск" />
              <div className="message-select">
                <ChatNav />
              </div>
            </div>

            <div className="messages-message">
              <div className="message-input-line">
              <div id="wrapp" className="messages-dialog">
                  <ChatDisplay />
                </div>
                <div className="message-sending">
                  <input className="message-file" type="file" name="" id="message-file" />
                  <label htmlFor="message-file" className="message-file-button">
                    <img src="/img/plus.svg" alt="" />
                  </label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="message-input" placeholder="Ваше сообщение" type="text" />
                  <button onClick={insertMessage} className="message-send">
                    <img src="/img/sent.svg" alt="" />
                  </button>
                </div>
              </div>

            </div>
          </ChatContext.Provider>
      </div>
    </>
  );
};

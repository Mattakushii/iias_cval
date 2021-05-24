import React, { useEffect, useState } from "react";
import Axios from 'axios';
import socket from "../../core/socket";

export const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([])
  const [isChatting, setIsChatting] = useState()

  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    Axios.get("/api/showchats", {headers: {
      "token": localStorage.getItem("token")
    }}).then((res) => {
      setChats(res.data)
    })
  }, [])

  return (
    <>
      <h1>Chat</h1>
      {chats.map((chat, key) => {
            return <p>{chat.name}</p>
      })}
      <section className="chat">
        <div className="chat__display">
        </div>
        <textarea
          className="chat__input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </section>
    </>
  );
};

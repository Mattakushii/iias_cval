import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import socket from "../../core/socket";
import { ChatNav } from "./UI/chat-nav";
import { ChatDisplay } from "./UI/chat-display";
import { ChatContext } from "./chat-context";
import { Input } from "react-chat-elements";
import { Button } from 'react-chat-elements'

export const ChatScreen = () => {
  const [dialog, setDialog] = useState(0);
  const [message, setMessage] = useState('')

  const insertMessage = (e) => {
    const token = localStorage.getItem("token")
    const messageSend = message
    const chatid = dialog
    socket.emit('sendmessage', {token, messageSend, chatid})
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
      <Input
        placeholder="Type here..."
        multiline={true}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rightButtons={
          <Button color="white" backgroundColor="black" text="Send" onClick={insertMessage}/>
        }
      />
    </>
  );
};

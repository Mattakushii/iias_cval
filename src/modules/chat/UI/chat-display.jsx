import React, { useEffect, useState, useContext } from "react";
import socket from "../../../core/socket";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import ReactMarkdown from "react-markdown";
import { ChatContext } from "../chat-context";


export const ChatDisplay = () => {
  const [dialog] = useContext(ChatContext);
  const [messages, setMessages] = useState();

  useEffect(() => {
    socket.emit("showmessage", dialog);
  },[dialog])

  useEffect(() => {
    socket.on("showmessage", (data) => {
      data.forEach((element) => {
        element.text = element.text;
      });
      console.log("Я в сокете")
      setMessages(data);
    });
    return () => {
      socket.off("showmessage")
    }
  })

  return (
    <>
      <MessageList
        className="chat__display"
        lockable={true}
        toBottomHei
        ght={"100%"}
        dataSource={messages}
      />
    </>
  );
};

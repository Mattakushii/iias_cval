import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import ReactMarkdown from "react-markdown";
import { ChatContext } from "../chat-context";

export const ChatDisplay = () => {
  const [dialog, setDialog] = useContext(ChatContext);
  const [messages, setMessages] = useState();

  useEffect(() => {
    console.log(dialog);
    if (dialog == 0) {
      setMessages([
        {
          position: "right",
          type: "text",
          text: <ReactMarkdown>Начните *общение*</ReactMarkdown>,
        },
      ]);
    } else {
      Axios.get("/api/showmessages", {
        headers: {
          chatId: dialog,
        },
      }).then((res) => {
        console.log(res);
        res.data.forEach((element) => {
          element.text = <ReactMarkdown>{element.text}</ReactMarkdown>;
        });
        setMessages(res.data);
      });
    }
  }, [dialog]);

  const text1 = `A paragraph with *emphasis* and **strong importance**.`;
  const text2 = `# Ya chto-to nazal i vse slomals'`;

  return (
    <>
      <MessageList
        className="chat__display"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={messages}
      />
    </>
  );
};

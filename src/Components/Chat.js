import React, { useState, useEffect } from "react";
import "./Chat.css";
import "bootstrap/dist/css/bootstrap.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../Firebase/firebase";
import { useStateValue } from "./Provider/StateProvider";
import firebase from "firebase";
import { css } from "emotion";
import ScrollToBottom from "react-scroll-to-bottom";

const ROOT_CSS = css({
  height: 500,
  width: 900,
});

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );

    setSeed(Math.floor(Math.random() * 5000));
    return () => {};
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    //
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <IconButton>
          <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
        </IconButton>
        <div className="chat-header-info">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <ScrollToBottom className={ROOT_CSS}>
        <div className="chat-body">
          {messages.map((message) => (
            <p 
              className={`chat-message ${
                message.name === user.displayName && "chat-reciever"
                //use id provided by google instead of name, as it is a right way to code
              }`}
            >
              <span className="chat-name">{message.name}</span>
              {message.message}
              <span className="chat-time">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
        </div>
      </ScrollToBottom>

      <div className="chat-footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form className="chat-form">
          <input
            type="text"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;

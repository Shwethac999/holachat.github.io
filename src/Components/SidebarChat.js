import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar, IconButton } from "@material-ui/core";
import db from "../Firebase/firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, url, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter chat room name");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
    return () => {
      //
    };
  }, [id]);

  return !addNewChat ? (
    <div>
      <Link to={`/rooms/${id}`} style={{ textDecoration: "none" }}>
        <div className="sidebarChat">
          <IconButton>
            <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
          </IconButton>
          <div className="sidebarChat-info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h3>Add new chat</h3>
    </div>
  );
}

export default SidebarChat;

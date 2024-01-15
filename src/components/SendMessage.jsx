import React, { useEffect, useState } from "react";
import { auth, fireStore } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  Box,
  IconButton,
  InputBase,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "" || message.length > "50") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(fireStore, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    scroll.current.scrollIntoView({ behavior: "smooth" });
    setMessage("");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        p: 2,
        bgcolor: "background.default",
      }}
      width="73%"
    >
      <form onSubmit={(e) => sendMessage(e)}>
        <Stack
          direction="row"
          sx={{
            border: "2px solid #d4d4d4",
            p: 1,
            borderRadius: 5,
            bgcolor: "background.default",
          }}
          alignItems="center"
          justifyContent="space-between"
        >
          <InputBase
            name="messageInput"
            type="text"
            placeholder="Type message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            fullWidth
          />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
};
export default SendMessage;

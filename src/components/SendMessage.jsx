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
import { useAuthState } from "react-firebase-hooks/auth";

const SendMessage = ({ scroll, receiverId }) => {
  const [messageInput, setMessageInput] = useState("");
  const user = useAuthState(auth);



  // const sendMessage = async (event) => {
  //   event.preventDefault();
  //   if (message.trim() === "" || message.length > "50") {
  //     alert("Enter valid message");
  //     return;
  //   }
  //   const { uid, displayName, photoURL } = auth.currentUser;
  //   await addDoc(collection(fireStore, "messages"), {
  //     text: message,
  //     name: displayName,
  //     avatar: photoURL,
  //     createdAt: serverTimestamp(),
  //     uid,
  //   });
  //   scroll.current.scrollIntoView({ behavior: "smooth" });
  //   setMessage("");
  // };



  const sendMessage = async (e) => {
    e.preventDefault()
    try {
      if (messageInput.trim() === "" || messageInput?.length > 50) {
        return;
      }
      if (user && receiverId) {
        await addDoc(
          collection(
            fireStore,
            "users",
            user?.uid,
            "chatUsers",
            receiverId,
            "messages"
          ),
          {
            username: user.displayName,
            messageUserId: user.uid,
            message: messageInput,
            timestamp: new Date(),
          }
        );

        await addDoc(
          collection(
            fireStore,
            "users",
            receiverId,
            "chatUsers",
            user.uid,
            "messages"
          ),
          {
            username: user.displayName,
            messageUserId: user.uid,
            message: messageInput,
            timestamp: new Date(),
          }
        );
      }
    } catch (error) {
      console.log(error);
    }

    setMessageInput("")
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
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
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
















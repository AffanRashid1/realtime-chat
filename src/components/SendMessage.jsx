import React, { useEffect, useState } from "react";
import { auth, fireStore } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../firebase";
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const SendMessage = ({ scroll, receiverId }) => {
  const [messageInput, setMessageInput] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const user = auth.currentUser;

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const sendMessage = async (e) => {
    e.preventDefault()
    try {
      if (!messageInput.trim() && !image) {
        return
      }
      if (user && receiverId) {
        if (image) {
          const storageRef = ref(storage, `images/${user.uid}/${Date.now()}_${image.name}`);
          await uploadBytes(storageRef, image);

          const imageUrl = await getDownloadURL(storageRef);
          setImageUrl(imageUrl)
        }

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
            avatar: user?.photoURL,
            imageUrl
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
            avatar: user?.photoURL,
            imageUrl
          }
        );
      }

    } catch (error) {
      console.log(error);
    }
    finally {
      setMessageInput("")
    }

  };

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        p: 2,
        bgcolor: "background.default",
      }}
      width="100%"
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
          <Button component="label" variant="contained" startIcon={<InsertPhotoIcon />}>
            <VisuallyHiddenInput type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
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










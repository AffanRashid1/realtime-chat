import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth, fireStore } from "../firebase";
import SendMessage from "./SendMessage";
import Message from "./Message";
import { Avatar, Box, IconButton, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import Layout from "./Layout/Layout";
import { useParams } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const scroll = useRef();
  const user = auth?.currentUser;
  const { receiverId } = useParams();


  let decodedReceiverData = receiverId && JSON.parse(decodeURIComponent(receiverId || ""))


  useEffect(() => {
    if (user) {

      setDoc(doc(fireStore, "users", user?.uid), {
        username: user?.displayName,
        email: user?.email,
        userId: user?.uid,
        timestamp: new Date(),
        avatar: user?.photoURL
      });
    }
  }, [user]);


  useEffect(() => {
    if (receiverId && user) {
      setIsLoading(true);
      const unSub = onSnapshot(
        query(
          collection(
            fireStore,
            "users",
            user?.uid,
            "chatUsers",
            decodedReceiverData?.userId,
            "messages"
          ),
          orderBy("timestamp")
        ),
        (snapshot) => {
          setMessages(
            snapshot.docs?.map((doc) => ({
              id: doc.id,
              messages: doc.data(),
            }))
          );
          setIsLoading(false);
        }
      );

      return unSub;
    } else {
      setIsLoading(false);
      setMessages([]);
    }
  }, [receiverId, user]);


  return (
    <>
      <Layout>
        {
          decodedReceiverData &&
          <Stack direction="row" bgcolor="background.paper" justifyContent="space-between" p="8px" alignItems="center" >
            <Stack direction="row" alignItems="center" gap={1}>
              <Avatar src={decodedReceiverData?.avatar} />
              <Typography variant="h5" color="white">{decodedReceiverData?.username}</Typography>
            </Stack>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        }
        {isLoading &&
          < LinearProgress />
        }
        <Box padding="0 0 140px 10px" sx={{ overflowY: "scroll", }} maxHeight="calc(100vh - 56px)" height="calc(100vh - 56px)"  >
          {messages?.map((message) => (
            <Message key={message?.id} message={message} />
          ))}
        </Box>
        <span ref={scroll}></span>
        <SendMessage scroll={scroll} receiverId={decodedReceiverData?.userId} receiverName={decodedReceiverData?.username} />
      </Layout>
    </>
  );
};

export default ChatBox;

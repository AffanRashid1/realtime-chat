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
import Navbar from "./Navbar";
import SendMessage from "./SendMessage";
import Message from "./Message";
import { Box, Paper, Stack } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "./Layout/Layout";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const user = auth?.currentUser;
  const data = useParams();


  useEffect(() => {
    setDoc(doc(fireStore, "users", user?.uid), {
      username: user?.displayName,
      email: user?.email,
      userId: user?.uid,
      timestamp: new Date(),
      avatar: user?.photoURL
    });


    // const q = query(
    //   collection(fireStore, "messages"),
    //   orderBy("createdAt", "desc"),
    //   limit(50)
    // );
    // const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    //   const fetchedMessages = [];
    //   QuerySnapshot.forEach((doc) => {
    //     fetchedMessages.push({ ...doc.data(), id: doc?.id });
    //   });

    //   const sortedMessages = fetchedMessages.sort(
    //     (a, b) => {
    //       return a.createdAt - b.createdAt
    //     }
    //   );

    //   setMessages(sortedMessages);

    // });
    // return () => unsubscribe;
  }, []);


  useEffect(() => {
    if (data?.receiverId) {
      const unsub = onSnapshot(
        query(
          collection(
            fireStore,
            "users",
            user?.uid,
            "chatUsers",
            data?.receiverId,
            "messages"
          ),
          orderBy("timestamp")
        ),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              messages: doc.data(),
            }))
          );
        }
      );

      return unsub;
    }
  }, [data?.receiverId]);



  return (
    <>
      <Layout>
        <Box padding="0 10px 80px 10px" sx={{ overflowY: "scroll", }} maxHeight="calc(100vh - 56px)" height="calc(100vh - 56px)">
          {messages?.map((message) => (
            <Message key={message?.id} message={message} />
          ))}
        </Box>
        <span ref={scroll}></span>
        <SendMessage scroll={scroll} receiverId={data?.receiverId} />
      </Layout>
    </>
  );
};

export default ChatBox;

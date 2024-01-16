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
import { Box, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import Layout from "./Layout/Layout";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const scroll = useRef();
  const { receiverId } = useParams();
  const user = auth?.currentUser;


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
            receiverId,
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
      // Handle the case when receiverId is null or undefined
      setIsLoading(false);
      setMessages([]);
    }
  }, [receiverId, user]);


  // useEffect(() => {
  //   setIsLoading(true)
  //   if (receiverId) {
  //     const unSub = onSnapshot(
  //       query(
  //         collection(
  //           fireStore,
  //           "users",
  //           user?.uid,
  //           "chatUsers",
  //           receiverId,
  //           "messages"
  //         ),
  //         orderBy("timestamp")
  //       ),
  //       (snapshot) => {
  //         setMessages(
  //           snapshot.docs?.map((doc) => ({
  //             id: doc.id,
  //             messages: doc.data(),
  //           }))
  //         );
  //         setIsLoading(false)
  //       }
  //     );

  //     return unSub;
  //   }
  // }, [receiverId]);





  return (
    <>
      <Layout>
        {isLoading &&
          < LinearProgress />
        }
        <Box padding="0 0 80px 10px" sx={{ overflowY: "scroll", }} maxHeight="calc(100vh - 56px)" height="calc(100vh - 56px)"  >
          {messages?.map((message) => (
            <Message key={message?.id} message={message} />
          ))}
        </Box>
        <span ref={scroll}></span>
        <SendMessage scroll={scroll} receiverId={receiverId} />
      </Layout>
    </>
  );
};

export default ChatBox;

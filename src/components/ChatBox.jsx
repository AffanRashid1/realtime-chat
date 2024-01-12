import React from 'react'
import { useEffect, useRef, useState } from "react";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { fireStore } from '../firebase';
import Navbar from './Navbar'
import SendMessage from './SendMessage';
import Message from './Message';
import { Box, Paper } from '@mui/material';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(() => {
        const q = query(
            collection(fireStore, "messages"),
            orderBy("createdAt", "desc"),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages);
        });
        return () => unsubscribe;
    }, []);
    return (
        <>
            <Box sx={{ minHeight: "100vh", bgcolor: "background.default", padding: "0 10px" }} >
                <Navbar />
                <Box>
                    {messages?.map((message) => (
                        <Message key={message.id} message={message} />
                    )).reverse()}
                </Box>
                {/* <span ref={scroll}></span> */}
                <SendMessage scroll={scroll} />
            </Box>
        </>
    )
}

export default ChatBox
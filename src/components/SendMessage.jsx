import React, { useState } from "react";
import { auth, fireStore } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
    Box,
    Button,
    IconButton,
    Input,
    InputBase,
    Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SendMessage = () => {
    const [message, setMessage] = useState("");

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
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
        setMessage("");
    };

    return (
        <Box>
            <form onSubmit={(e) => sendMessage(e)} style={{ width: "100%" }}>
                <Stack
                    direction="row"
                    width='98%'
                    sx={{
                        position: "fixed",
                        bottom: 10,
                        border: "2px solid #d4d4d4",
                        p: 1,
                        // margin: "0 10px",
                        borderRadius: 5,
                        // zIndex: 2,
                        bgcolor: "background.default"
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

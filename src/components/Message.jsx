import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Box, Stack, Typography } from "@mui/material";
const Message = ({ message }) => {
    const [user] = useAuthState(auth);

    return (
        <Stack
            direction="row"
            gap={2}
            // className={`${message.uid === user.uid ? "right" : ""}`}
            m="20px"
            p={1}
            sx={{
                bgcolor: "secondary.main",
                width: "max-content",
                maxWidth: "50%",
                borderRadius: 4,
                marginLeft: message?.uid === user.uid && "auto",


            }}
        >
            <Avatar
                className="chat-bubble__left"
                src={message?.avatar}
                alt="user avatar"
            />
            <Box>
                <Typography variant="caption" color="white">
                    {message?.name === user?.displayName ? "You" : message?.name}
                </Typography>
                <Typography variant="body1" color="white">
                    {message.text}
                </Typography>
            </Box>
        </Stack >
    );
};
export default Message;

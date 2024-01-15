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
            m="20px"
            p={1}
            sx={{
                bgcolor: "secondary.main",
                width: "max-content",
                maxWidth: { xs: "90%", sm: "50%" },
                borderRadius: 4,
                wordBreak: "break-word",
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
                <Typography variant="body1" color="white" fontSize={{ xs: "12px", sm: "15px" }}>
                    {message.text}
                </Typography>
            </Box>
        </Stack >
    );
};
export default Message;

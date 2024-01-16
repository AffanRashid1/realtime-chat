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
                marginLeft: message?.messages?.messageUserId === user.uid && "auto",
            }}
        >

            <Avatar
                className="chat-bubble__left"
                src={message?.messages?.avatar}
                alt="user avatar"
            />
            <Box>
                <Typography variant="caption" color="white">
                    {message?.messages?.username === user?.displayName ? "You" : message?.messages?.username}
                </Typography>
                <Typography variant="body1" color="white" fontSize={{ xs: "12px", sm: "15px" }}>
                    {message?.messages?.message}
                </Typography>
            </Box>
        </Stack >
    );
};
export default Message;

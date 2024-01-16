import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Box, Stack, Typography } from "@mui/material";
const Message = ({ message }) => {
    console.log("🚀 ~ Message ~ message:", message)
    const [user] = useAuthState(auth);

    return (
        <Stack
            // direction={message?.messages?.messageUserId === user.uid ? "row-reverse" : "row"}
            direction="row"
            gap={2}
            m="20px"
            p={1}
            sx={{
                bgcolor: "secondary.main",
                width: "max-content",
                maxWidth: { xs: "90%", sm: "50%" },
                borderTopLeftRadius:
                    user?.uid == message?.messages.messageUserId ? 10 : 0,
                borderTopRightRadius:
                    user?.uid == message?.messages.messageUserId ? 0 : 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                wordBreak: "break-word",
                marginLeft: message?.messages?.messageUserId === user.uid && "auto",
            }}
        >

            {/* <Avatar
                src={message?.messages?.avatar}
                alt="user avatar"
            /> */}
            <Box>
                <Typography variant="caption" color="white">
                    {message?.messages?.username === user?.displayName ? "You" : message?.messages?.username}
                </Typography>
                <Typography variant="body1" color="white" fontSize={{ xs: "12px", sm: "15px" }}>
                    {message?.messages?.message}
                </Typography>
                {message?.messages?.imageUrl &&
                    <img src={message?.messages?.imageUrl} alt="image" width="100%" style={{ borderRadius: 7 }} />
                }
            </Box>
        </Stack >
    );
};
export default Message;

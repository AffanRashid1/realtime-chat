import React from 'react'
import { AppBar, Avatar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../firebase';


const Navbar = () => {
    const userDetail = auth.currentUser;
    const signOut = () => {
        auth.signOut();
    };


    return (
        <>
            <AppBar position="sticky">
                <Stack justifyContent="space-between" direction="row" alignItems="center" px={1} py={1}>
                    <Typography variant="h6" color="inherit" component="div">
                        {userDetail?.displayName}
                    </Typography>
                    <Stack direction="row" gap={2}>
                        <Avatar src={userDetail?.photoURL} />
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={signOut} >
                            <LogoutIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </AppBar>
        </>

    )
}

export default Navbar
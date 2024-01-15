import React, { useEffect, useState } from 'react'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper } from '@mui/material'
import { collection, onSnapshot } from 'firebase/firestore';
import { fireStore } from '../../firebase';

const SideBar = () => {

    const [users, setUsers] = useState(null)


    useEffect(() => {
        const unSub = onSnapshot(collection(fireStore, "users"), (snapshot) => {
            setUsers(snapshot.docs.map((doc) => doc.data()));
        });
        return unSub;
    }, []);

    return (
        <>
            <Paper sx={{ width: "100%", minHeight: "100%" }}>
                <List
                    sx={{
                        width: "100%",
                    }}
                >
                    {users?.map((value, index) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;

                        return (
                            <ListItem key={value.userId} disablePadding sx={{ padding: "7px 0" }}>
                                <ListItemButton
                                // onClick={() => {
                                //     handleToggle(value.username, value.userId);
                                // }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={value.username}
                                            src={value?.avatar}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId}
                                        primary={`${value.username}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </>
    )
}

export default SideBar
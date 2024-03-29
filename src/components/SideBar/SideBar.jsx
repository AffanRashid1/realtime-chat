import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, fireStore } from "../../firebase";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const user = auth?.currentUser;

  useEffect(() => {
    const unSub = onSnapshot(collection(fireStore, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
    return unSub;
  }, []);

  const handleToggle = (value) => {
    const serializedValue = encodeURIComponent(JSON.stringify(value));
    navigate(`/chat-home/${serializedValue}`);
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          maxHeight: "100vh",
          height: "100vh",
          wordBreak: "break-word",
        }}
      >
        <List
          sx={{
            width: "100%",
          }}
        >
          {users?.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            if (user?.uid !== value.userId)
              return (
                <ListItem
                  key={value.userId}
                  disablePadding
                  sx={{ padding: "7px 0" }}
                >
                  <ListItemButton
                    onClick={() => {
                      handleToggle(value);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={value.username} src={value?.avatar} />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={`${value.username}`} />
                  </ListItemButton>
                </ListItem>
              );
          })}
        </List>
      </Paper>
    </>
  );
};

export default SideBar;

import React from "react";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Stack } from "@mui/material";

const Login = () => {

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };


  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Button onClick={googleSignIn} variant="contained">
        Continue With google
      </Button>
    </Stack>
  );
};

export default Login;

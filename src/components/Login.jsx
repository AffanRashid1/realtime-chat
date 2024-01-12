import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Stack, Typography } from '@mui/material';

const Login = () => {
    const [user] = useAuthState(auth);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };
    // const signOut = () => {
    //     auth.signOut();
    // };

    return (
        <Stack>
            {user ? (
                <Button onClick={signOut} className="sign-out" type="button">
                    Sign Out
                </Button>
            ) : (
                <Button onClick={googleSignIn} variant='contained'>
                    Continue With google
                </Button>
            )}

        </Stack>
    );
};

export default Login












// import React, { useState } from "react";
// import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";

// const Login = () => {
//   const [user, setUser] = useState(false);
//   const googleSignIn = () => {
//     setUser(true);
//   };
//   const signOut = () => {
//     setUser(false);
//   };
//   return (
//     <nav className="nav-bar">
//       <h1>React Chat</h1>
//       {user ? (
//         <button onClick={signOut} className="sign-out" type="button">
//           Sign Out
//         </button>
//       ) : (
//         <button className="sign-in">
//           <img
//             onClick={googleSignIn}
//             src={GoogleSignin}
//             alt="sign in with google"
//             type="button"
//           />
//         </button>
//       )}
//     </nav>
//   );
// };
// export default Login;
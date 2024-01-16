import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import ChatBox from "./components/ChatBox";
import Splash from "./screen/Splash";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const [user, loading] = useAuthState(auth);

  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#071A2B",
        light: "#e8dfde",
      },
      secondary: {
        main: "#162C46",
      },
      background: {
        default: "#031525",
        paper: "#162C46",
      },
      text: {
        primary: "#fff",
      },
      action: {
        active: "#C7C4C6",
        selected: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {loading ? <Splash /> :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={!user ? <Login /> : <ChatBox />} />;
            <Route path="/chat-home/:receiverId" element={<ChatBox />} />;
          </Routes>
        </BrowserRouter>
      }
    </ThemeProvider>
    // <ThemeProvider theme={theme}>
    //   {loading ? (
    //     <Splash />
    //   ) : (
    //     <BrowserRouter>
    //       <Routes>
    //         <Route
    //           path="/"
    //           element={user ? <Navigate to="/chat-home" /> : <Login />}
    //         />
    //         <Route
    //           path="/chat-home"
    //           element={user ? <Navigate to="/chat-home/default-receiver" /> : <Navigate to="/" />}
    //         >
    //           <Route
    //             path="/" 
    //             element={<ChatBox receiverId="default-receiver" />}
    //           />
    //           <Route
    //             path="/:receiverId"
    //             element={<ChatBox />}
    //           />
    //         </Route>
    //       </Routes>
    //     </BrowserRouter>
    //   )}
    // </ThemeProvider>
  );
}
export default App;

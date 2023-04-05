import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import BottomMenu from "./shared/components/navigation/BottomMenu";
import SideMenu from "./shared/components/navigation/SideMenu";
import UserChatPage from "./users/pages/UserChatPage";
import UserExplorePage from "./users/pages/UserExplorePage";
import UserMainPage from "./users/pages/UserMainPage";
import UserProfilePage from "./users/pages/UserProfilePage";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserAuthPage from "./users/pages/UserAuthPage";
import { connect } from "react-redux";

import { signInWithToken } from "./actions";

function App(props) {
  const matches = useMediaQuery("(min-width:600px)");
  // const isLogedIn = false;
  useEffect(() => {
    props.signInWithToken();
  }, []);

  if (!props.user.token) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserAuthPage />}></Route>
            <Route path="/signup" element={<UserAuthPage isSignUp />}></Route>
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <BrowserRouter>
        {matches ? <SideMenu /> : ""}

        <Routes>
          <Route path="/" element={<UserMainPage />}></Route>
          <Route path="/explore" element={<UserExplorePage />}></Route>
          <Route path="/chat/inbox" element={<UserChatPage />}></Route>
          <Route
            path="/profile/:username"
            element={<UserProfilePage />}
          ></Route>
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* <Navigate to="/"></Navigate> */}
        {!matches ? <BottomMenu /> : ""}
      </BrowserRouter>
    </Box>
  );
}

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState, { signInWithToken })(App);

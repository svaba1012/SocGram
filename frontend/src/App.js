import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import BottomMenu from "./components/navigation/BottomMenu";
import SideMenu from "./components/navigation/SideMenu";
import UserChatPage from "./components/pages/UserChatPage";
import UserExplorePage from "./components/pages/UserExplorePage";
import UserMainPage from "./components/pages/UserMainPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import UserAuthPage from "./components/pages/UserAuthPage";
import useMediaQuery from "@mui/material/useMediaQuery";
import { connect } from "react-redux";
import ProfilePosts from "./components/profile/ProfilePosts";
import ProfileSavedPosts from "./components/profile/ProfileSavedPosts";
import { signInWithToken } from "./actions/user-actions";

function App(props) {
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    props.signInWithToken();
  }, []);

  if (!props.user || !props.user.token) {
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
          <Route path="/profile/:username" element={<UserProfilePage />}>
            <Route path="" element={<ProfilePosts />}></Route>
            <Route path="saved" element={<ProfileSavedPosts />}></Route>
            <Route path="tagged" element={<ProfilePosts isTagged />}></Route>
          </Route>
          <Route path="/posts/:pid" element={<UserProfilePage />} />

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

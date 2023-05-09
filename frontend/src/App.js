import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
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
import ProfilePosts from "./components/profile/ProfilePosts";
import ProfileSavedPosts from "./components/profile/ProfileSavedPosts";
import LikedByModal from "./components/modals/LikedByModal";
import FollowsModal from "./components/modals/FollowsModal";
import FollowersModal from "./components/modals/FollowersModal";
import { signInWithToken } from "./actions/user-actions";
import PostPage from "./components/pages/PostPage";

function App(props) {
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    props.signInWithToken();
  }, []);

  if (!props.user || !props.user.isLoaded) {
    return;
  }

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
    <Box sx={{ display: "flex", minHeight: "95vh" }}>
      <BrowserRouter>
        {matches ? <SideMenu /> : ""}

        <Routes>
          <Route
            path="/"
            element={<UserMainPage userId={props.user.userId} />}
          ></Route>
          <Route path="/explore" element={<UserExplorePage />}></Route>
          <Route path="/chat/inbox" element={<UserChatPage />}></Route>
          <Route path="/profile/:username" element={<UserProfilePage />}>
            <Route path="" element={<ProfilePosts />}>
              <Route path="following" element={<FollowsModal />}></Route>
              <Route path="followers" element={<FollowersModal />}></Route>
            </Route>
            <Route path="saved" element={<ProfileSavedPosts />}></Route>
            <Route path="tagged" element={<ProfilePosts isTagged />}></Route>
          </Route>
          <Route
            path="/posts/:pid"
            element={
              props.isFromProfile ? (
                <UserProfilePage />
              ) : (
                <PostPage outsideModal />
              )
            }
          >
            <Route path="liked_by" element={<LikedByModal />} />
          </Route>

          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* <Navigate to="/"></Navigate> */}
        {!matches ? <BottomMenu /> : ""}
      </BrowserRouter>
    </Box>
  );
}

const mapState = (state) => {
  return { user: state.user, isFromProfile: state.post.isEnteredFromProfile };
};

export default connect(mapState, { signInWithToken })(App);

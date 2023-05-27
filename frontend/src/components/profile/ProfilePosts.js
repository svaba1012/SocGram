import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  getProfilePosts,
  setPostEnteredFromProfile,
} from "../../actions/post-actions";
import ProfilePostsGrid from "./ProfilePostsGrid";

function ProfilePosts({
  posts,
  isTagged,
  getProfilePosts,
  profile,
  setPostEnteredFromProfile,
  getProfileMarkedPosts,
}) {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/posts")) {
      return;
    }
    getProfilePosts();
  }, []);

  return (
    <ProfilePostsGrid
      posts={posts}
      handleOnClick={() => {
        setPostEnteredFromProfile(true);
      }}
      isTagged={false}
    />
  );
}

const mapState = (state) => {
  return { posts: state.profile.profilePosts, profile: state.profile };
};

export default connect(mapState, {
  getProfilePosts,
  setPostEnteredFromProfile,
})(ProfilePosts);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  setPostEnteredFromProfile,
  getProfileMarkedPosts,
} from "../../actions/post-actions";
import ProfilePostsGrid from "./ProfilePostsGrid";

function ProfileTaggedPosts({
  posts,
  setPostEnteredFromProfile,
  getProfileMarkedPosts,
}) {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/posts")) {
      return;
    }
    getProfileMarkedPosts();
  }, []);

  return (
    <ProfilePostsGrid
      posts={posts}
      handleOnClick={() => {
        setPostEnteredFromProfile(true);
      }}
      isTagged={true}
    />
  );
}

const mapState = (state) => {
  return { posts: state.profile.profileMarkedPosts };
};

export default connect(mapState, {
  setPostEnteredFromProfile,
  getProfileMarkedPosts,
})(ProfileTaggedPosts);

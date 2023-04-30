import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

import PostProfile from "../posts/PostProfile";
import { getProfilePosts } from "../../actions/post-actions";

function ProfilePosts({ posts, isTagged, getProfilePosts, profile }) {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/posts")) {
      return;
    }
    getProfilePosts();
  }, []);

  const navigate = useNavigate();

  if (!posts) {
    return;
  }

  return (
    <>
      <Outlet
        context={{
          open: true,
          handleClose: () => navigate(-1),
          userIds: profile.followers,
        }}
      />

      <Grid container spacing={2}>
        {posts.map((post, id) => (
          <Grid key={id} item xs={4} sx={{ aspectRatio: "1/1" }}>
            <PostProfile isTagged={isTagged} post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const mapState = (state) => {
  return { posts: state.profile.profilePosts, profile: state.profile };
};

export default connect(mapState, { getProfilePosts })(ProfilePosts);

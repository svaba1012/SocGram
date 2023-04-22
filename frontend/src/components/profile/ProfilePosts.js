import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PostProfile from "../posts/PostProfile";
import { getProfilePosts } from "../../actions/post-actions";

const arr = [1, 2, 1, 31, 1, 1, 1, 1, 1, 1, 1, 1];

function ProfilePosts({ posts, isTagged, getProfilePosts }) {
  useEffect(() => {
    getProfilePosts();
  }, [posts, getProfilePosts]);

  if (!posts) {
    return;
  }

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={4} sx={{ aspectRatio: "1/1" }}>
          <PostProfile isTagged={isTagged} post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

const mapState = (state) => {
  return { posts: state.profile.profilePosts };
};

export default connect(mapState, { getProfilePosts })(ProfilePosts);

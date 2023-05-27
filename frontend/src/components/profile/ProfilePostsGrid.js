import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, Container, Grid } from "@mui/material";

import PostProfile from "../posts/PostProfile";
import {
  getProfilePosts,
  setPostEnteredFromProfile,
  getProfileMarkedPosts,
} from "../../actions/post-actions";

function ProfilePostsGrid({ posts, handleOnClick, isTagged }) {
  const navigate = useNavigate();
  if (!posts || posts.isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }

  return (
    <>
      <Outlet
        context={{
          open: true,
          handleClose: () => navigate(-1),
        }}
      />

      <Grid container spacing={2}>
        {posts.map((post, id) => (
          <Grid key={id} item xs={4} sx={{ aspectRatio: "1/1" }}>
            <PostProfile
              isTagged={isTagged}
              post={post}
              handleOnClick={() => {
                setPostEnteredFromProfile(true);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProfilePostsGrid;

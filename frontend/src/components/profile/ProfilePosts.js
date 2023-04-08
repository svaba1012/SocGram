import { Grid } from "@mui/material";
import React from "react";
import PostProfile from "../posts/PostProfile";

const arr = [1, 2, 1, 31, 1, 1, 1, 1, 1, 1, 1, 1];

function ProfilePosts(props) {
  return (
    <Grid container spacing={2}>
      {arr.map((el) => (
        <Grid item xs={4} sx={{ aspectRatio: "1/1" }}>
          <PostProfile isTagged={props.isTagged} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProfilePosts;

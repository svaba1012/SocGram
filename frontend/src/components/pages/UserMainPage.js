import React from "react";
import { Box, Container } from "@mui/material";
import PostList from "../posts/PostList";

function UserMainPage({ userId }) {
  return (
    <Container component="main" sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <PostList userId={userId} />
        </Container>
      </Box>
      <Box sx={{ width: "30%" }}>Maybe you know</Box>
    </Container>
  );
}

export default UserMainPage;

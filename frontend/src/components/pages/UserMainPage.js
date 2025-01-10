import React from "react";
import { Box, Container, Typography } from "@mui/material";
import PostList from "../posts/PostList";
import UserSuggestions from "../user/UserSuggestions";
import { Link } from "react-router-dom";
import CurrentUserListItem from "../user/CurrentUserListItem";

function UserMainPage({ userId }) {
  return (
    <Container component="main" sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <PostList userId={userId} />
      </Box>
      <Box sx={{}}>{<UserSuggestions userId={userId} />}</Box>
    </Container>
  );
}

export default UserMainPage;

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import PostList from "../posts/PostList";
import UserSuggestions from "../user/UserSuggestions";
import { Link } from "react-router-dom";
import UserListItem from "../user/UserListItem";
import CurrentUserListItem from "../user/CurrentUserListItem";

function UserMainPage({ userId }) {
  return (
    <Container component="main" sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <PostList userId={userId} />
      </Box>
      <Box sx={{}}>
        <CurrentUserListItem/>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ color: "grey" }}>Suggestions</Typography>
          <Typography
            sx={{
              cursor: "pointer",
              marginLeft: "auto",
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
            }}
            component={Link}
            to="explore/users"
          >
            Show more
          </Typography>
        </Box>
        <UserSuggestions userId={userId} />
      </Box>
    </Container>
  );
}

export default UserMainPage;

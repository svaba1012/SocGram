import {
  Avatar,
  AvatarGroup,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";

function PostNumberOfLikes({ post }) {
  return (
    <Box>
      <ListItem>
        <ListItemAvatar>
          <AvatarGroup>
            <Avatar src="#" alt="A" sx={{ width: 24, height: 24 }}></Avatar>
            <Avatar src="#" alt="A" sx={{ width: 24, height: 24 }}></Avatar>
            <Avatar src="#" alt="A" sx={{ width: 24, height: 24 }}></Avatar>
          </AvatarGroup>
        </ListItemAvatar>
        <ListItemText primary={"Liked by user and 24 more"}></ListItemText>
      </ListItem>
    </Box>
  );
}

export default PostNumberOfLikes;

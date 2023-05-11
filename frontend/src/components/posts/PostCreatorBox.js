import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import server from "../../config/server";

function PostCreatorBox({ post, withoutPadding }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Link
        to={`/profile/${post.creator.username}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem sx={{ paddingLeft: withoutPadding ? "0px" : "" }}>
          <ListItemAvatar>
            <Avatar
              src={`${server.getUri()}/${post.creator.profileImage}`}
              alt={post.creator.username}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <span style={{ fontWeight: 900 }}>{post.creator.username}</span>
            }
          ></ListItemText>
        </ListItem>
      </Link>
      <Divider />
    </Box>
  );
}

export default PostCreatorBox;

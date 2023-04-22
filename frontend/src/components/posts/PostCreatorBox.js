import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import server from "../../config/server";

function PostCreatorBox({ post }) {
  console.log(post);

  return (
    <Box sx={{ width: "100%" }}>
      <Link
        to={`/profile/${post.creator.username}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItem>
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

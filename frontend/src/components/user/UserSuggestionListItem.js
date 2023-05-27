import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import server from "../../config/server";

function UserSuggestionListItem({ suggestion }) {
  return (
    <ListItem sx={{padding: "0px"}}>
      <Link
        to={`/profile/${suggestion.user.username}`}
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <ListItemAvatar sx={{ minWidth: "40px" }}>
          <Avatar
            sx={{ width: "35px", height: "35px" }}
            src={`${server.getUri()}/${suggestion.user.profileImage}`}
            alt={suggestion.user.username.toUpperCase()}
          ></Avatar>
        </ListItemAvatar>
      </Link>
      <ListItemText
        primary={
          <Link
            style={{
              fontSize: "0.9em",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
            to={`/profile/${suggestion.user.username}`}
          >
            {suggestion.user.username}
          </Link>
        }
        secondary={
          <span style={{ fontSize: "0.8em" }}>
            {`Followed by ${suggestion.oneFollower.username} ${
              suggestion.num - 1 > 0 ? `+ ${suggestion.num - 1} more` : ""
            }`}
          </span>
        }
        sx={{marginRight: "40px"}}
      />
      <ListItemButton color="primary" sx={{ color: "blue", marginLeft: "auto", padding: "0px" }}>
        Follow
      </ListItemButton>
    </ListItem>
  );
}

export default UserSuggestionListItem;

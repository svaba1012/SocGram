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

function UserSuggestionListItem({
  suggestion,
  withFullname = false,
  withFollowButton = false,
  onClick,
}) {
  return (
    <ListItem sx={{ padding: "2px" }} onClick={onClick}>
      <Link
        to={`/profile/${suggestion.username}`}
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <ListItemAvatar sx={{ minWidth: "40px" }}>
          <Avatar
            sx={{ width: "35px", height: "35px" }}
            src={`${server.getUri()}/${suggestion.profileImage}`}
            alt={suggestion.username.toUpperCase()}
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
            to={`/profile/${suggestion.username}`}
          >
            {suggestion.username}
          </Link>
        }
        secondary={
          <span style={{ fontSize: "0.8em" }}>
            {`${
              withFullname
                ? suggestion.firstName + " " + suggestion.lastName + " ●"
                : ""
            } Followed by ${suggestion.oneFollows[0].username} ${
              suggestion.numOfFollows - 1 > 0
                ? `+ ${suggestion.numOfFollows - 1} more`
                : ""
            }`}
          </span>
        }
        sx={{ marginRight: "40px", paddingLeft: "5px" }}
      />
      {withFollowButton ? (
        <ListItemButton
          color="primary"
          sx={{ color: "blue", marginLeft: "auto", padding: "0px" }}
        >
          Follow
        </ListItemButton>
      ) : (
        <></>
      )}
    </ListItem>
  );
}

export default UserSuggestionListItem;

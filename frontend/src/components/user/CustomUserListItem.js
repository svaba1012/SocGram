import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import server from "../../config/server";
import StopFollowingModal from "../modals/StopFollowingModal";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#CCCCCC",
      light: "#EEEEEE",
      dark: "#999999",
      contrastText: "#000",
    },
  },
});

function CustomUserListItem({ user, isLink, renderButtons, onClick }) {
    if(!renderButtons){
        renderButtons = () => {}
    }

    if(!onClick){
      onClick = (u) => {};
    }

  const isFollowedByMe = false;
    const renderListItem = () => {
        return <ListItem onClick={() => onClick(user)}>
        <ListItemAvatar>
          <Avatar
            src={`${server.getUri()}/${user.profileImage}`}
            alt={user.username.toUpperCase()}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<span style={{ fontWeight: 700 }}>{user.username}</span>}
          secondary={
            user.firstName
              ? user.firstName
              : " " + user.lastName
              ? user.lastName
              : ""
          }
        />
        {renderButtons()}
      </ListItem>
    }

  return (
    <>
    {isLink ? 
      <Link
      to={`/profile/${user.username}`}
      style={{ textDecoration: "none", color: "inherit" }}
      >
        {renderListItem()}
      </Link> : renderListItem()
    }
    </>
  );
}

export default CustomUserListItem;

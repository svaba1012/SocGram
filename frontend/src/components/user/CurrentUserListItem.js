import React from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import server from "../../config/server";
import { Link } from "react-router-dom";

function CurrentUserListItem({ user }) {
  return (
    <Link
      to={`profile/${user.username}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <ListItem sx={{ paddingLeft: "0px" }}>
        <ListItemAvatar>
          <Avatar
            src={`${server.getUri()}/${user.profileImage}`}
            alt={user.username.toUpperCase()}
            sx={{ width: "50px", height: "50px" }}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <span style={{ fontWeight: 700, fontSize: "1.2em" }}>
              {user.username}
            </span>
          }
          secondary={
            user.firstName
              ? user.firstName
              : " " + user.lastName
              ? user.lastName
              : ""
          }
        />
        {/* <Link to={`profile/${user.username}`} style={{textDecoration: "none"}}>
        Profile
    </Link> */}
      </ListItem>
    </Link>
  );
}

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(CurrentUserListItem);

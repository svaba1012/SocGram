import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import server from "../../config/server";

function CommentBox({ comment }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={`${server.getUri()}/${comment.creator.profileImage}`} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <span>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: 900,
              }}
              to={`/profile/${comment.creator.username}`}
            >
              {comment.creator.username}
            </Link>{" "}
            {comment.text}
          </span>
        }
        secondary={comment.time}
      ></ListItemText>
    </ListItem>
  );
}

export default CommentBox;

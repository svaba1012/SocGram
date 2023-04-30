import React from "react";
import { Link } from "react-router-dom";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

import server from "../../config/server";
import { formatDateDistanceFromNow } from "../../utils/dateFunctions";

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
        secondary={formatDateDistanceFromNow(comment.time)}
      ></ListItemText>
    </ListItem>
  );
}

export default CommentBox;

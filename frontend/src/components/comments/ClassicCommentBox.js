import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import server from "../../config/server";
import { formatDateDistanceFromNow } from "../../utils/dateFunctions";
import { setNewCommentAsAnswerComment } from "../../actions/new-comment-actions";
import { connect } from "react-redux";

function ClassicCommentBox({
  comment,
  isDescription,
  setNewCommentAsAnswerComment,
  parentCommentId,
}) {
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
            {comment.answerUser ? (
              <Link to={`/profile/${comment.answerUser}`}>
                @{comment.answerUser}{" "}
              </Link>
            ) : (
              ""
            )}
            {comment.text}
          </span>
        }
        secondary={
          <span>
            <span>{formatDateDistanceFromNow(comment.time)}</span>
            {"   "}
            {!isDescription ? (
              <>
                {comment.likes.length > 0 ? (
                  <span style={{ cursor: "pointer", fontWeight: "600" }}>
                    {comment.likes.length} likes
                  </span>
                ) : (
                  ""
                )}
                <span
                  style={{ cursor: "pointer", fontWeight: "900" }}
                  onClick={() =>
                    setNewCommentAsAnswerComment(
                      parentCommentId || comment._id,
                      comment.creator.username
                    )
                  }
                >
                  {"  "}Answer
                </span>
              </>
            ) : (
              ""
            )}
          </span>
        }
      ></ListItemText>
      {!isDescription ? (
        <ListItemIcon>
          <FavoriteBorderRoundedIcon />
        </ListItemIcon>
      ) : (
        ""
      )}
    </ListItem>
  );
}

export default connect(null, {
  setNewCommentAsAnswerComment,
})(ClassicCommentBox);

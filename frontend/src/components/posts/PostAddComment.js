import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  ListItem,
  ListItemIcon,
  TextField,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import {
  setNewCommentText,
  addComment,
  setNewCommentAsAnswerComment,
} from "../../actions/new-comment-actions";

function PostAddComment({
  post,
  id,
  comment,
  setComment,
  addComment,
  creator,
  setNewCommentAsAnswerComment,
}) {
  return (
    <ListItem sx={{ width: "100%" }}>
      <TextField
        id={id}
        variant="standard"
        size="small"
        placeholder="Add comment"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              {creator ? (
                <>
                  <Link
                    to={`/profile/${creator}`}
                    style={{ color: "blue" }}
                  >{` @${creator}`}</Link>
                  <CancelPresentationIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => setNewCommentAsAnswerComment(null)}
                  />{" "}
                </>
              ) : (
                ""
              )}
            </InputAdornment>
          ),
        }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ width: "95%" }}
      ></TextField>

      <ListItemIcon>
        <IconButton onClick={() => addComment(post._id)}>
          <SendRoundedIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
}

const mapState = (state) => {
  let answerOnCommentUsername = state.newComment.answerOnCommentUsername;
  // let comment;
  // let commentCreatorUsername;
  // if (commentId) {
  //   comment = state.post.comments.find((comment) => comment._id === commentId);
  //   commentCreatorUsername = comment.creator.username;
  // } else {
  //   commentCreatorUsername = null;
  // }
  return { comment: state.newComment.text, creator: answerOnCommentUsername };
};

export default connect(mapState, {
  setComment: setNewCommentText,
  addComment,
  setNewCommentAsAnswerComment,
})(PostAddComment);

import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  ListItem,
  ListItemIcon,
  TextField,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import EmojiPickerPopper from "../popper/EmojiPickerPopper";
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
  withoutPadding,
}) {
  let [commentText, setCommentText] = useState("");
  let padding = withoutPadding ? { padding: "0px" } : {};
  return (
    <>
      <ListItem sx={{ width: "100%", ...padding }}>
        <EmojiPickerPopper
          handleOnClick={(emoji) => {
            setCommentText(commentText + emoji.emoji);
          }}
        />
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
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{ width: "95%" }}
        ></TextField>

        <ListItemIcon>
          <IconButton
            onClick={() => {
              setComment(commentText);
              addComment(post._id);
              setCommentText("");
            }}
            sx={{ marginLeft: "auto" }}
          >
            <SendRoundedIcon />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    </>
  );
}

const mapState = (state) => {
  let answerOnCommentUsername = state.newComment.answerOnCommentUsername;

  return { comment: state.newComment.text, creator: answerOnCommentUsername };
};

export default connect(mapState, {
  setComment: setNewCommentText,
  addComment,
  setNewCommentAsAnswerComment,
})(PostAddComment);

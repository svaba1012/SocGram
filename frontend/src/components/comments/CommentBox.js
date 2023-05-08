import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { setNewCommentAsAnswerComment } from "../../actions/new-comment-actions";
import { getAnswersOfComment } from "../../actions/comment-actions";
import { connect } from "react-redux";
import ClassicCommentBox from "./ClassicCommentBox";

function CommentBox({
  comment,
  isDescription,
  setNewCommentAsAnswerComment,
  getAnswersOfComment,
}) {
  return (
    <>
      <ClassicCommentBox comment={comment} isDescription={isDescription} />
      {comment.answersIds?.length > 0 ? (
        <List sx={{ marginLeft: "50px" }}>
          <ListItem>
            <ListItemText
              secondary={
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    getAnswersOfComment(
                      comment.postId,
                      comment._id,
                      !comment.answersShowed,
                      !comment.answers
                    );
                  }}
                >
                  &mdash;{" "}
                  {comment.answersShowed
                    ? "Hide answers"
                    : `Show answers (${comment.answersIds?.length})`}
                </span>
              }
            ></ListItemText>
          </ListItem>
          {comment.answersShowed &&
          !!comment.answers &&
          comment.answers.length > 0
            ? comment.answers.map((answer) => (
                <ClassicCommentBox
                  comment={answer}
                  parentCommentId={comment._id}
                />
              ))
            : ""}
          {comment.answersShowed ? (
            <Box
              sx={{
                width: "inherit",
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              {comment.answersLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {comment.answersIds.length > comment.answers.length ? (
                    <AddCircleOutlineIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        getAnswersOfComment(comment.postId, comment._id, true)
                      }
                    />
                  ) : (
                    ""
                  )}
                </>
              )}
            </Box>
          ) : (
            ""
          )}
        </List>
      ) : (
        ""
      )}
    </>
  );
}

export default connect(null, {
  setNewCommentAsAnswerComment,
  getAnswersOfComment,
})(CommentBox);

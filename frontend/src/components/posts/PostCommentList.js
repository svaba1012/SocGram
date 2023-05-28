import React, { useEffect } from "react";
import { connect } from "react-redux";
import { List, Box, Container, CircularProgress } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import CommentBox from "../comments/CommentBox";
import { getCommentsByPostId } from "../../actions/comment-actions";

function PostCommentList({ post, style, getCommentsByPostId }) {
  useEffect(() => {
    getCommentsByPostId(post._id);
  }, []);
  if (post.commentsLoading && (!post.comments || post.comments.length === 0)) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <CircularProgress size={60} thickness={3} />
      </Container>
    );
  }

  return (
    <Box sx={{ overflowY: "scroll", height: "50%", ...style }}>
      <List>
        <CommentBox
          comment={{
            text: post.description,
            creator: post.creator,
            time: post.time,
          }}
          isDescription
        ></CommentBox>
        {post.comments.map((comment, id) => (
          <CommentBox comment={comment} key={id} />
        ))}
        <Box
          sx={{
            width: "inherit",
            display: "flex",
            justifyContent: "center",
            p: 1,
          }}
        >
          {post.commentsLoading && post.comments.length > 0 ? (
            <CircularProgress />
          ) : (
            <>
              {post.numOfComments > post.comments.length ? (
                <AddCircleOutlineIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => getCommentsByPostId(post._id)}
                />
              ) : (
                ""
              )}
            </>
          )}
        </Box>
      </List>
    </Box>
  );
}

const mapState = (state) => {
  return { comments: state.post.comments };
};

export default connect(mapState, { getCommentsByPostId })(PostCommentList);

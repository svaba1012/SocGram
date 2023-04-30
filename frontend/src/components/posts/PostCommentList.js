import React, { useEffect } from "react";
import { connect } from "react-redux";
import { List, Box } from "@mui/material";

import CommentBox from "../comments/CommentBox";

function PostCommentList({ post, style }) {
  useEffect(() => {}, []);
  return (
    <Box sx={{ overflowY: "scroll", height: "50%", ...style }}>
      <List>
        <CommentBox
          comment={{
            text: post.description,
            creator: post.creator,
            time: post.time,
          }}
        ></CommentBox>
      </List>
    </Box>
  );
}

const mapState = (state) => {
  return { comments: state.post.comments };
};

export default connect(mapState, {})(PostCommentList);

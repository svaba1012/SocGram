import React from "react";
import { connect } from "react-redux";
import { Box, IconButton } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import { likePost, removePostLike } from "../../actions/post-actions";

function PostButtonList({ post, likePost, removePostLike, user }) {
  if (!post.likes) {
    return <div></div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      {post.likes.lenght === 0 || post.likes.includes(user.userId) ? (
        <IconButton onClick={() => removePostLike(post._id, user.userId)}>
          <FavoriteRoundedIcon sx={{ color: "red" }} />
        </IconButton>
      ) : (
        <IconButton onClick={() => likePost(post._id, user.userId)}>
          <FavoriteBorderRoundedIcon />
        </IconButton>
      )}

      <IconButton>
        <ChatBubbleOutlineRoundedIcon />
      </IconButton>
      <IconButton>
        <SendRoundedIcon />
      </IconButton>
      <IconButton sx={{ marginLeft: "auto" }}>
        <BookmarkBorderRoundedIcon />
      </IconButton>
    </Box>
  );
}

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState, { likePost, removePostLike })(PostButtonList);

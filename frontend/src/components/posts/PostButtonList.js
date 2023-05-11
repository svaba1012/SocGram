import React from "react";
import { connect } from "react-redux";
import { Box, IconButton } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import { likePost, removePostLike } from "../../actions/post-actions";

function PostButtonList({
  post,
  likePost,
  removePostLike,
  user,
  withoutPadding,
}) {
  if (!post.likes) {
    return <div></div>;
  }

  return (
    <Box sx={{ display: "flex", padding: withoutPadding ? "0px" : "8px" }}>
      {post.likes.lenght === 0 || post.likes.includes(user.userId) ? (
        <IconButton
          onClick={() => removePostLike(post._id, user.userId)}
          sx={{ paddingLeft: withoutPadding ? "0px" : "8px" }}
        >
          <FavoriteRoundedIcon sx={{ color: "red", fontSize: "1.3em" }} />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => likePost(post._id, user.userId)}
          sx={{ paddingLeft: withoutPadding ? "0px" : "8px" }}
        >
          <FavoriteBorderRoundedIcon sx={{ fontSize: "1.3em" }} />
        </IconButton>
      )}

      <IconButton>
        <ChatBubbleOutlineRoundedIcon sx={{ fontSize: "1.3em" }} />
      </IconButton>
      <IconButton>
        <SendRoundedIcon sx={{ fontSize: "1.3em" }} />
      </IconButton>
      <IconButton sx={{ marginLeft: "auto" }}>
        <BookmarkBorderRoundedIcon sx={{ fontSize: "1.3em" }} />
      </IconButton>
    </Box>
  );
}

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState, { likePost, removePostLike })(PostButtonList);

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
  removeLike,
  isLikedByMe,
  withoutPadding,
}) {
  if (!post.likesIds) {
    return <div></div>;
  }

  return (
    <Box sx={{ display: "flex", padding: withoutPadding ? "0px" : "8px" }}>
      {post.likesIds.lenght === 0 || isLikedByMe ? (
        <IconButton
          onClick={() => removeLike()}
          sx={{ paddingLeft: withoutPadding ? "0px" : "8px" }}
        >
          <FavoriteRoundedIcon sx={{ color: "red", fontSize: "1.3em" }} />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => likePost()}
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

export default PostButtonList;

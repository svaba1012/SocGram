import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

function PostButtonList(props) {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton>
        <FavoriteBorderRoundedIcon />
      </IconButton>
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

export default PostButtonList;

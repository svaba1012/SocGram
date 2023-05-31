import React from "react";
import { Link } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";

import server from "../../config/server";
import PostCreatorBox from "./PostCreatorBox";
import ImageCarousel from "../reusables/ImageCarousel";
import PostButtonList from "./PostButtonList";
import PostNumberOfLikes from "./PostNumberOfLikes";
import PostAddComment from "./PostAddComment";
import PostImageCarousel from "./PostImageCarousel";

function PostMainPage({ post, removeLike, isLikedByMe, likePost }) {
  return (
    <Box sx={{ width: "80vh", marginBottom: "20px" }}>
      <PostCreatorBox post={post} withoutPadding />
      <PostImageCarousel
        post={post}
        isLikedByMe={isLikedByMe}
        likePost={likePost}
      />

      <PostButtonList
        post={post}
        withoutPadding
        isLikedByMe={isLikedByMe}
        likePost={likePost}
        removeLike={removeLike}
      />
      <PostNumberOfLikes post={post} withoutPadding />
      <Typography>
        <span style={{ fontWeight: 600 }}>{post.creator.username} </span>
        <span>{post.description}</span>
      </Typography>
      {post.numOfComments > 0 ? (
        <Typography
          sx={{ color: "grey", textDecoration: "none" }}
          component={Link}
          to={`/posts/${post._id}`}
        >
          Show all comments ({post.numOfComments})
        </Typography>
      ) : (
        ""
      )}
      <PostAddComment post={post} withoutPadding />
      <Divider />
    </Box>
  );
}

export default PostMainPage;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Container, Divider } from "@mui/material";

import ImageCarousel from "../reusables/ImageCarousel";
import PostCreatorBox from "../posts/PostCreatorBox";
import PostCommentList from "../posts/PostCommentList";
import PostButtonList from "../posts/PostButtonList";
import PostNumberOfLikes from "../posts/PostNumberOfLikes";
import PostAddComment from "../posts/PostAddComment";
import server from "../../config/server";

import {
  getPostById,
  likePost,
  removePostLike,
} from "../../actions/post-actions";
import PostImageCarousel from "../posts/PostImageCarousel";

function PostPage({
  post,
  getPostById,
  outsideModal,
  likePost,
  removePostLike,
  user,
}) {
  let { pid } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    getPostById(pid);
  }, [pid]);

  if (post.isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "inherit",
        }}
      >
        <CircularProgress size={100} thickness={4} />
      </Container>
    );
  }

  // console.log(post.likes);
  if (!post.multimedias) {
    return;
  }

  let outsideModalStyle = outsideModal
    ? {
        margin: "20px",
        border: "2px solid grey",
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
      }
    : {};
  return (
    <Box
      sx={{
        display: "flex",
        height: "inherit",
        flexGrow: 1,
        maxHeight: "88vh",
        ...outsideModalStyle,
      }}
    >
      {/* Liked by modal */}
      <Outlet
        context={{
          open: true,
          handleClose: () => navigate("../"),
          userIds: post.likes,
        }}
      />
      <PostImageCarousel
        post={post}
        likePost={() => likePost(post._id, user.userId)}
        isLikedByMe={post.likesIds.includes(user.userId)}
      />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <PostCreatorBox post={post} />
        <PostCommentList post={post} style={{ flexGrow: 1 }} />

        <PostButtonList
          post={post}
          likePost={() => likePost(post._id, user.userId)}
          removeLike={() => {
            removePostLike(post._id, user.userId);
          }}
          isLikedByMe={post.likesIds.includes(user.userId)}
        />
        <PostNumberOfLikes post={post} />
        <Divider />
        <PostAddComment post={post} />
      </Box>
    </Box>
  );
}

const mapState = (state) => {
  return { post: state.post, user: state.user };
};

export default connect(mapState, { getPostById, removePostLike, likePost })(
  PostPage
);

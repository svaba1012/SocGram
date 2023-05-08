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

import { getPostById } from "../../actions/post-actions";

function PostPage({ post, getPostById, outsideModal }) {
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
      <Box sx={{ height: "inherit", aspectRatio: "1/1" }}>
        <ImageCarousel
          tabsNum={post.multimedias.length}
          additionalComponents={[]}
        >
          {post.multimedias.map((url, id) => (
            <img
              style={{ height: "100%" }}
              src={`${server.getUri()}/${url}`}
              alt="Slika"
              key={id}
            ></img>
          ))}
        </ImageCarousel>
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <PostCreatorBox post={post} />
        <PostCommentList post={post} style={{ flexGrow: 1 }} />

        <PostButtonList post={post} />
        <PostNumberOfLikes post={post} />
        <Divider />
        <PostAddComment post={post} />
      </Box>
    </Box>
  );
}

const mapState = (state) => {
  return { post: state.post };
};

export default connect(mapState, { getPostById })(PostPage);

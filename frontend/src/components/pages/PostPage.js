import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";

import ImageCarousel from "../reusables/ImageCarousel";
import PostCreatorBox from "../posts/PostCreatorBox";
import PostCommentList from "../posts/PostCommentList";
import PostButtonList from "../posts/PostButtonList";
import PostNumberOfLikes from "../posts/PostNumberOfLikes";
import PostAddComment from "../posts/PostAddComment";
import server from "../../config/server";

import { getPostById } from "../../actions/post-actions";

function PostPage({ post, getPostById }) {
  let { pid } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    getPostById(pid);
  }, []);

  // console.log(post.likes);
  if (!post.multimedias) {
    return;
  }

  return (
    <Box sx={{ display: "flex", height: "inherit" }}>
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

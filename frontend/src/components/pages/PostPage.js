import { Box, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ImageCarousel from "../forms/NewPostForm/ImageCarousel";
import { getPostById } from "../../actions/post-actions";
import server from "../../config/server";
import PostCreatorBox from "../posts/PostCreatorBox";
import PostCommentList from "../posts/PostCommentList";
import PostButtonList from "../posts/PostButtonList";
import PostNumberOfLikes from "../posts/PostNumberOfLikes";
import PostAddComment from "../posts/PostAddComment";

function PostPage({ post, getPostById }) {
  let { pid } = useParams();
  useEffect(() => {
    getPostById(pid);
  }, [pid, getPostById]);

  if (!post.multimedias) {
    return;
  }

  return (
    <Box sx={{ display: "flex", height: "inherit" }}>
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
            ></img>
          ))}
        </ImageCarousel>
      </Box>
      <Box sx={{ width: "40%" }}>
        <PostCreatorBox post={post} />
        <PostCommentList post={post} />
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

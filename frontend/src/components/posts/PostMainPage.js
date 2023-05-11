import React from "react";
import { Link } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";

import server from "../../config/server";
import PostCreatorBox from "./PostCreatorBox";
import ImageCarousel from "../reusables/ImageCarousel";
import PostButtonList from "./PostButtonList";
import PostNumberOfLikes from "./PostNumberOfLikes";
import PostAddComment from "./PostAddComment";

function PostMainPage({ post }) {
  return (
    <Box sx={{ width: "80vh", marginBottom: "20px" }}>
      <PostCreatorBox post={post} withoutPadding />
      <Box sx={{ height: "80vh", aspectRatio: "1/1" }}>
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
      <PostButtonList post={post} withoutPadding />
      <PostNumberOfLikes post={post} />
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

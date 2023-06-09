import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  getPostsOfFollows,
  likePost,
  removePostLike,
} from "../../actions/post-actions";
import PostMainPage from "./PostMainPage";

function PostList({
  userId,
  posts,
  getPostsOfFollows,
  likePost,
  removePostLike,
}) {
  useEffect(() => {
    getPostsOfFollows(userId);
  }, []);
  if (!posts) {
    return <div></div>;
  }
  return (
    <Container>
      {posts.map((post, id) => (
        <PostMainPage
          post={post}
          key={id}
          id={id}
          likePost={() => {
            likePost(post._id, userId, id);
          }}
          removeLike={() => {
            removePostLike(post._id, userId, id);
          }}
          isLikedByMe={post.likesIds.includes(userId)}
        />
      ))}
    </Container>
  );
}

const mapState = (state) => {
  return { posts: state.mainPage.posts };
};

export default connect(mapState, {
  getPostsOfFollows,
  likePost,
  removePostLike,
})(PostList);

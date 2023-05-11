import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPostsOfFollows } from "../../actions/post-actions";
import PostMainPage from "./PostMainPage";

function PostList({ userId, posts, getPostsOfFollows }) {
  useEffect(() => {
    getPostsOfFollows(userId);
  }, []);
  if (!posts) {
    return <div></div>;
  }
  return (
    <Container>
      {posts.map((post) => (
        <PostMainPage post={post} />
      ))}
    </Container>
  );
}

const mapState = (state) => {
  return { posts: state.mainPage.posts };
};

export default connect(mapState, { getPostsOfFollows })(PostList);

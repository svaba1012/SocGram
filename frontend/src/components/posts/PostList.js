import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPostsOfFollows } from "../../actions/post-actions";

function PostList({ userId, posts, getPostsOfFollows }) {
  useEffect(() => {
    getPostsOfFollows(userId);
  }, []);
  return <div></div>;
}

const mapState = (state) => {
  return { posts: state.mainPage.posts };
};

export default connect(mapState, { getPostsOfFollows })(PostList);

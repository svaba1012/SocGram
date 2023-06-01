import {
  GET_POSTS_OF_FOLLOWS_LOADING,
  GET_POSTS_OF_FOLLOWS,
  LIKE_POST,
  REMOVE_POST_LIKE,
  ADD_COMMENT,
} from "../actions/types";

const mainPageReducer = (state = {}, action) => {
  let posts;
  switch (action.type) {
    case GET_POSTS_OF_FOLLOWS_LOADING:
      return { ...state };
    case GET_POSTS_OF_FOLLOWS:
      return { ...state, posts: action.payload };
    case ADD_COMMENT:
      if (action.payload.postArrayId == null) {
        return { ...state };
      }
      posts = state.posts.map((post, id) => {
        if (id === action.payload.postArrayId) {
          if (!post.comments) {
            post.comments = [];
          }
          return {
            ...post,
            comments: [...post.comments, action.payload.comment],
            numOfComments: post.numOfComments + 1,
          };
        }
        return post;
      });
      return { ...state, posts };
    case LIKE_POST:
      if (action.payload.postArrayId == null) {
        return { ...state };
      }
      posts = state.posts.map((post, id) => {
        if (id === action.payload.postArrayId) {
          return { ...post, likesIds: [...post.likesIds, action.payload.uid] };
        }
        return { ...post };
      });
      return { ...state, posts: posts };
    case REMOVE_POST_LIKE:
      if (action.payload.postArrayId == null) {
        return { ...state };
      }
      posts = state.posts.map((post, id) => {
        if (id === action.payload.postArrayId) {
          return {
            ...post,
            likesIds: post.likesIds.filter(
              (like) => like !== action.payload.uid
            ),
          };
        }
        return { ...post };
      });
      return { ...state, posts: posts };
    default:
      return { ...state };
  }
};

export default mainPageReducer;

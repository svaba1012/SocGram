import {
  GET_POSTS_OF_FOLLOWS_LOADING,
  GET_POSTS_OF_FOLLOWS,
} from "../actions/types";

const mainPageReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POSTS_OF_FOLLOWS_LOADING:
      return { ...state };
    case GET_POSTS_OF_FOLLOWS:
      return { ...state, posts: action.payload };
    default:
      return { ...state };
  }
};

export default mainPageReducer;

import { GET_COMMENTS_BY_POST_ID, GET_POST_BY_ID } from "../actions/types";

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POST_BY_ID:
      return { ...action.payload };
    case GET_COMMENTS_BY_POST_ID:
      return { ...state, comments: action.payload };
    default:
      return { ...state };
  }
};

export default postReducer;

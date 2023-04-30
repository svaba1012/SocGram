import {
  GET_COMMENTS_BY_POST_ID,
  GET_POST_BY_ID,
  GET_USERS_WHO_LIKED,
  GET_USER_PROFILES_BY_IDS,
  LIKE_POST,
  REMOVE_POST_LIKE,
} from "../actions/types";

const postReducer = (state = {}, action) => {
  let likes;
  switch (action.type) {
    case GET_POST_BY_ID:
      return { ...action.payload, likedBy: state.likedBy };
    case GET_COMMENTS_BY_POST_ID:
      return { ...state, comments: action.payload };
    case GET_USER_PROFILES_BY_IDS:
      if (action.payload.type !== "likedBy") {
        return { ...state };
      }
      return { ...state, likedBy: action.payload.users };
    case GET_USERS_WHO_LIKED:
      return { ...state, likedBy: action.payload };

    case LIKE_POST:
      likes = [...state.likes];
      return { ...state, likes: [...likes, action.payload] };
    case REMOVE_POST_LIKE:
      likes = [...state.likes];
      return {
        ...state,
        likes: likes.filter((like) => like !== action.payload),
      };
    default:
      return { ...state };
  }
};

export default postReducer;

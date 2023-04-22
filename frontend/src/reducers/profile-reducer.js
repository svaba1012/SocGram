import {
  CHANGE_PROFILE_IMAGE,
  GET_PROFILE_POSTS,
  GET_USER_PROFILE,
  REMOVE_PROFILE_IMAGE,
} from "../actions/types";

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...action.payload };
    case REMOVE_PROFILE_IMAGE:
      return { ...state, profileImage: null };
    case CHANGE_PROFILE_IMAGE:
      return { ...state, profileImage: action.payload };
    case GET_PROFILE_POSTS:
      return { ...state, profilePosts: action.payload };
    default:
      return { ...state };
  }
};

export default profileReducer;

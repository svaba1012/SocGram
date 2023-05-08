import {
  CHANGE_PROFILE_IMAGE,
  FOLLOW_USER,
  GET_PROFILE_POSTS,
  GET_PROFILE_POSTS_LOADING,
  GET_USER_PROFILE,
  GET_USER_PROFILES_BY_IDS,
  GET_USER_PROFILE_LOADING,
  REMOVE_PROFILE_IMAGE,
} from "../actions/types";

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...action.payload };
    case GET_USER_PROFILE_LOADING:
      return { isLoading: true };
    case REMOVE_PROFILE_IMAGE:
      return { ...state, profileImage: null };
    case CHANGE_PROFILE_IMAGE:
      return { ...state, profileImage: action.payload };
    case GET_PROFILE_POSTS:
      return { ...state, profilePosts: action.payload };
    case GET_PROFILE_POSTS_LOADING:
      return { ...state, profilePosts: { isLoading: true } };
    case FOLLOW_USER:
      let followers = [...state.follows, action.payload];
      return { ...state, followers };
    case GET_USER_PROFILES_BY_IDS:
      if (action.payload.type === "follows") {
        return { ...state, followsUsers: action.payload.users };
      } else if (action.payload.type === "followers") {
        return { ...state, followersUsers: action.payload.users };
      } else {
        return { ...state };
      }

    default:
      return { ...state };
  }
};

export default profileReducer;

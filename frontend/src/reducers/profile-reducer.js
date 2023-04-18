import { GET_USER_PROFILE } from "../actions/types";

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...action.payload };
    default:
      return { ...state };
  }
};

export default profileReducer;

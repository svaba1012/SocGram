import { SIGN_UP, SIGN_IN } from "../actions/types";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case SIGN_UP:
      return action.payload;
    case SIGN_IN:
      return action.payload;
    default:
      return { ...state };
  }
};

export default userReducer;

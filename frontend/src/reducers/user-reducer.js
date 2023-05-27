import { SIGN_UP, SIGN_IN, GET_CURRENT_USER_INFO } from "../actions/types";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case SIGN_UP:
      return action.payload;
    case SIGN_IN:
      return action.payload;
    case GET_CURRENT_USER_INFO:
      return {...state, ...action.payload};
    default:
      return { ...state };
  }
};

export default userReducer;

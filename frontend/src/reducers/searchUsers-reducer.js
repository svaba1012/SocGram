import { SEARCH_FOR_USER, SEARCH_FOR_USER_LOADING } from "../actions/types";

const searchedUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case SEARCH_FOR_USER_LOADING:
      return { ...state, isLoading: true };
    case SEARCH_FOR_USER:
      return { ...state, users: action.payload, isLoading: false };
    default:
      return { ...state };
  }
};

export default searchedUsersReducer;

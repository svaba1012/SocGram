import {
  GET_SUGGESTIONS_FOR_USER,
  GET_SUGGESTIONS_FOR_USER_LOADING,
} from "../actions/types";

const userSuggestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUGGESTIONS_FOR_USER_LOADING:
      return { ...state };
    case GET_SUGGESTIONS_FOR_USER:
      return { ...state, suggestions: action.payload };
    default:
      return { ...state };
  }
};

export default userSuggestionsReducer;

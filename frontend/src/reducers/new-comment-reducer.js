import {
  SET_NEW_COMMENT_AS_ANSWER_COMMENT,
  SET_NEW_COMMENT_TEXT,
} from "../actions/types";

const newCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_NEW_COMMENT_TEXT:
      return { ...state, text: action.payload };
    case SET_NEW_COMMENT_AS_ANSWER_COMMENT:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

export default newCommentReducer;

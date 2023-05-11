import { combineReducers } from "redux";
import mainPageReducer from "./mainPage-reducer";
import newCommentReducer from "./new-comment-reducer";
import newPostReducer from "./new-post-reducer";
import postReducer from "./post-reducer";
import profileReducer from "./profile-reducer";

import userReducer from "./user-reducer";
import userSuggestionsReducer from "./userSuggestions-reducer";

const reducers = {
  user: userReducer,
  newPostModalState: newPostReducer,
  profile: profileReducer,
  post: postReducer,
  newComment: newCommentReducer,
  mainPage: mainPageReducer,
  userSuggestions: userSuggestionsReducer,
};

export default combineReducers(reducers);

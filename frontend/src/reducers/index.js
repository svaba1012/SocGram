import { combineReducers } from "redux";
import mainPageReducer from "./mainPage-reducer";
import newCommentReducer from "./new-comment-reducer";
import newPostReducer from "./new-post-reducer";
import postReducer from "./post-reducer";
import profileReducer from "./profile-reducer";

import userReducer from "./user-reducer";
import userSuggestionsReducer from "./userSuggestions-reducer";
import taggedUsersReducer from "./tagged-users-reducer";
import searchedUsersReducer from "./searchUsers-reducer";

const reducers = {
  user: userReducer,
  newPostModalState: newPostReducer,
  profile: profileReducer,
  post: postReducer,
  newComment: newCommentReducer,
  mainPage: mainPageReducer,
  userSuggestions: userSuggestionsReducer,
  taggedUsers: taggedUsersReducer,
  searchedUsers: searchedUsersReducer,
};

export default combineReducers(reducers);

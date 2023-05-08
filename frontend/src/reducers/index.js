import { combineReducers } from "redux";
import newCommentReducer from "./new-comment-reducer";
import newPostReducer from "./new-post-reducer";
import postReducer from "./post-reducer";
import profileReducer from "./profile-reducer";

import userReducer from "./user-reducer";

const reducers = {
  user: userReducer,
  newPostModalState: newPostReducer,
  profile: profileReducer,
  post: postReducer,
  newComment: newCommentReducer,
};

export default combineReducers(reducers);

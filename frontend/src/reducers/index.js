import { combineReducers } from "redux";
import newPostReducer from "./new-post-reducer";
import postReducer from "./post-reducer";
import profileReducer from "./profile-reducer";

import userReducer from "./user-reducer";

const reducers = {
  user: userReducer,
  newPostModalState: newPostReducer,
  profile: profileReducer,
  post: postReducer,
};

export default combineReducers(reducers);

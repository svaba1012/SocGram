import { combineReducers } from "redux";
import newPostReducer from "./new-post-reducer";
import profileReducer from "./profile-reducer";

import userReducer from "./user-reducer";

const reducers = {
  user: userReducer,
  newPostModalState: newPostReducer,
  profile: profileReducer,
};

export default combineReducers(reducers);

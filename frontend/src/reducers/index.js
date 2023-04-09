import { combineReducers } from "redux";
import newPostReducer from "./new-post-reducer";

import userReducer from "./user-reducer";

const reducers = { user: userReducer, newPostModalState: newPostReducer };

export default combineReducers(reducers);

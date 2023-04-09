import {
  SET_NEW_POST_IMAGES,
  SET_NEW_POST_IMAGE_ASPECT_RATIO,
  SET_NEW_POST_MODAL_TAB,
} from "../actions/types";

const newPostReducer = (
  state = { tabIndex: 0, files: [], aspectRatio: "1/1" },
  action
) => {
  switch (action.type) {
    case SET_NEW_POST_MODAL_TAB:
      return { ...state, tabIndex: action.payload };
    case SET_NEW_POST_IMAGE_ASPECT_RATIO:
      return { ...state, aspectRatio: action.payload };
    case SET_NEW_POST_IMAGES:
      return { ...state, files: action.payload };
    default:
      return { ...state };
  }
};

export default newPostReducer;

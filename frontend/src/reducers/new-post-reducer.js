import {
  SET_NEW_POST_IMAGES,
  SET_NEW_POST_IMAGES_ZOOM,
  SET_NEW_POST_IMAGE_ASPECT_RATIO,
  SET_NEW_POST_IMAGE_INDEX,
  SET_NEW_POST_IMAGE_SCROLL,
  SET_NEW_POST_MODAL_TAB,
} from "../actions/types";

const newPostReducer = (
  state = {
    tabIndex: 0,
    files: [],
    aspectRatio: "1/1",
    imageId: 0,
  },
  action
) => {
  switch (action.type) {
    case SET_NEW_POST_MODAL_TAB:
      return { ...state, tabIndex: action.payload };
    case SET_NEW_POST_IMAGE_ASPECT_RATIO:
      return { ...state, aspectRatio: action.payload };
    case SET_NEW_POST_IMAGE_INDEX:
      return { ...state, imageId: action.payload };
    case SET_NEW_POST_IMAGES:
      return { ...state, files: action.payload };
    case SET_NEW_POST_IMAGES_ZOOM:
      let files = [...state.files];
      const { imageId, zoom } = action.payload;
      files[imageId].zoom = zoom;
      return { ...state, files: files };
    case SET_NEW_POST_IMAGE_SCROLL:
      let files1 = [...state.files];
      const { imageIndex, scroll } = action.payload;
      files1[imageIndex].scroll = scroll;
      return { ...state, files: files1 };
    default:
      return { ...state };
  }
};

export default newPostReducer;

import server from "../config/server";
import { cropImage, dataURLtoFile } from "../utils/imageProcess";
import {
  POST_NEW_POST,
  PROCESS_CROPPING_OF_IMAGES,
  RESET_MODAL_STATE,
  SET_NEW_POST_DECRIPTION,
  SET_NEW_POST_IMAGES,
  SET_NEW_POST_IMAGES_ZOOM,
  SET_NEW_POST_IMAGE_ASPECT_RATIO,
  SET_NEW_POST_IMAGE_INDEX,
  SET_NEW_POST_IMAGE_PIXEL_WIDTH,
  SET_NEW_POST_IMAGE_SCROLL,
  SET_NEW_POST_MODAL_TAB,
  SET_NEW_POST_MODAL_WINDOW_WIDTH,
} from "./types";

const POST_BASE_ROUTE = "/api/posts";

export const setNewPostModalTab = (tabIndex) => {
  return { type: SET_NEW_POST_MODAL_TAB, payload: tabIndex };
};

export const setNewPostImageAspectRatio = (aspectRatio) => {
  return { type: SET_NEW_POST_IMAGE_ASPECT_RATIO, payload: aspectRatio };
};

function getImageHeightAndWidth(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve({ height: img.height, width: img.width });
    img.onerror = reject;
    img.src = src;
  });
}

export const setNewPostImages = (images) => async (dispatch) => {
  let imagesWithMetaData = await Promise.all(
    images.map(async (file) => {
      const { height, width } = await getImageHeightAndWidth(file.url);
      return {
        ...file,
        file: file.file,
        height,
        width,
        scroll: { top: 0, left: 0 },
      };
    })
  );

  dispatch({ type: SET_NEW_POST_IMAGES, payload: imagesWithMetaData });
};

export const setNewPostImagesZoom = (imageId, zoom) => {
  return { type: SET_NEW_POST_IMAGES_ZOOM, payload: { imageId, zoom } };
};

export const setNewPostImagesScroll = (imageIndex, scroll) => {
  return { type: SET_NEW_POST_IMAGE_SCROLL, payload: { imageIndex, scroll } };
};

export const setNewPostImageIndex = (imageId) => {
  return { type: SET_NEW_POST_IMAGE_INDEX, payload: imageId };
};

export const processCroppingOfImages = () => async (dispatch, getState) => {
  let { files, aspectRatio } = getState().newPostModalState;

  let cropedImages = await Promise.all(
    files.map(async (file) => await cropImage(file, aspectRatio))
  );

  let cropedFilesUrl = await Promise.all(
    cropedImages.map(async (image) => await image.toDataURL("image/png"))
  );
  dispatch({
    type: PROCESS_CROPPING_OF_IMAGES,
    payload: { cropedFilesUrl },
  });
};

export const setNewPostModalWindowWidth = (width) => {
  return { type: SET_NEW_POST_MODAL_WINDOW_WIDTH, payload: width };
};

export const setNewPostModalDescription = (text) => {
  return { type: SET_NEW_POST_DECRIPTION, payload: text };
};

export const resetModalState = () => {
  return { type: RESET_MODAL_STATE };
};

// export const setImageWidth = (width) => {
//   return { type: SET_NEW_POST_IMAGE_PIXEL_WIDTH, payload: width };
// };

const aspectRatioValues = {
  "1/1": 1,
  "4/5": 0.8,
  "16/9": 16 / 9,
};

export const postNewPost = (uid) => async (dispatch, getState) => {
  let { cropedFilesUrl, description, aspectRatio } =
    getState().newPostModalState;
  let aspect = aspectRatioValues[aspectRatio];
  let WIDTH_OF_IMAGE;
  let HEIGHT_OF_IMAGE;
  if (aspect > 1) {
    WIDTH_OF_IMAGE = 400;
    HEIGHT_OF_IMAGE = WIDTH_OF_IMAGE / aspect;
  } else {
    HEIGHT_OF_IMAGE = 400;
    WIDTH_OF_IMAGE = HEIGHT_OF_IMAGE * aspect;
  }
  let taggedUsers = getState().taggedUsers.map((tagged) => {
    return {
      userId: tagged.user._id,
      // username: tagged.username,
      imageId: tagged.imageId,
      position: {
        x: tagged.position.x / WIDTH_OF_IMAGE,
        y: tagged.position.y / HEIGHT_OF_IMAGE,
      },
    };
  });

  let cropedImages = await Promise.all(
    cropedFilesUrl.map(
      async (imageUrl) => await dataURLtoFile(imageUrl, "filename")
    )
  );

  let newPostFormData = new FormData();
  cropedImages.forEach((image) => {
    newPostFormData.append("images", image);
  });

  newPostFormData.append("description", description);
  newPostFormData.append("creator", uid);
  newPostFormData.append("tagged", JSON.stringify(taggedUsers));

  let res = await server.post(`${POST_BASE_ROUTE}`, newPostFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  dispatch({
    type: POST_NEW_POST,
  });
};

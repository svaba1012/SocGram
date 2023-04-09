import server from "../config/server";
import {
  SET_NEW_POST_IMAGES,
  SET_NEW_POST_IMAGE_ASPECT_RATIO,
  SET_NEW_POST_MODAL_TAB,
  SIGN_IN,
  SIGN_UP,
} from "./types";

const USER_BASE_ROUTE = "/api/users";

export const signUp = (username, email, password) => async (dispatch) => {
  let res;
  try {
    res = await server.post(`${USER_BASE_ROUTE}/signup`, {
      username,
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }

  console.log(res);
  dispatch({ type: SIGN_UP, payload: null });
};

let timeoutId;

export const signIn = (usernameOrEmail, password) => async (dispatch) => {
  let res;
  try {
    res = await server.post(`${USER_BASE_ROUTE}/signin`, {
      usernameOrEmail,
      password,
    });
  } catch (err) {
    console.log(err);
  }

  let user = res.data;
  let userData = {
    userId: user._id,
    token: user.token,
    expiresIn: new Date().getTime() + 60 * 60 * 1000,
  };
  if (res.status === 200) {
    localStorage.setItem("userData", JSON.stringify(userData));
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      localStorage.removeItem("userData");
      dispatch({ type: SIGN_IN, payload: null });
    }, 60 * 60 * 1000);

    dispatch({ type: SIGN_IN, payload: userData });
  }
};

export const signInWithToken = () => async (dispatch) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (userData.expiresIn < new Date().getTime()) {
    dispatch({ type: SIGN_IN, payload: null });
    localStorage.removeItem("userData");
    return;
  }
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    localStorage.removeItem("userData");
    dispatch({ type: SIGN_IN, payload: null });
  }, userData.expiresIn - new Date().getTime());

  dispatch({ type: SIGN_IN, payload: userData });
};

export const setNewPostModalTab = (tabIndex) => {
  return { type: SET_NEW_POST_MODAL_TAB, payload: tabIndex };
};

export const setNewPostImageAspectRatio = (aspectRatio) => {
  return { type: SET_NEW_POST_IMAGE_ASPECT_RATIO, payload: aspectRatio };
};

export const setNewPostImages = (images) => {
  return { type: SET_NEW_POST_IMAGES, payload: images };
};

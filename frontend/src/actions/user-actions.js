import server from "../config/server";
import {
  CHANGE_PROFILE_IMAGE,
  GET_USER_PROFILE,
  GET_USER_PROFILES_BY_IDS,
  REMOVE_PROFILE_IMAGE,
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

  let user = res.data.user;
  console.log(user);
  let userData = {
    userId: user._id,
    username: user.username,
    token: res.data.token,
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

    dispatch({
      type: SIGN_IN,
      payload: userData,
    });
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

export const getUserProfile = (username) => async (dispatch) => {
  let res = await server.get(`${USER_BASE_ROUTE}/${username}`);
  // PROVJERI

  let profile = res.data;
  dispatch({ type: GET_USER_PROFILE, payload: profile.user });
};

export const getUserProfilesByIds = (ids) => async (dispatch) => {
  let queryObj = { users: ids };
  let queryObjJson = JSON.stringify(queryObj);
  let res = await server.get(`${USER_BASE_ROUTE}?users=${queryObjJson}`);

  dispatch({ type: GET_USER_PROFILES_BY_IDS, payload: res.data.users });
};

export const removeProfileImage = (uid) => async (dispatch) => {
  let res = await server.delete(`${USER_BASE_ROUTE}/${uid}/profileImage`);

  console.log(res);

  dispatch({ type: REMOVE_PROFILE_IMAGE });
};

export const changeProfileImage = (uid, file) => async (dispatch) => {
  let formData = new FormData();
  formData.append("image", file);
  formData.append("uid", uid);
  let res = await server.post(
    `${USER_BASE_ROUTE}/${uid}/profileImage`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  dispatch({ type: CHANGE_PROFILE_IMAGE, payload: res.data.imageUrl });
};

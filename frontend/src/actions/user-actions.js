import server from "../config/server";
import {
  CHANGE_PROFILE_IMAGE,
  FOLLOW_USER,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USERS_WHO_LIKED,
  GET_USER_PROFILE,
  GET_USER_PROFILES_BY_IDS,
  GET_USER_PROFILE_LOADING,
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
  let userData = {
    userId: user._id,
    username: user.username,
    profileImage: user.profileImage,
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
  if (!userData || !userData.expiresIn) {
    dispatch({ type: SIGN_IN, payload: { isLoaded: true } });
    return;
  }
  if (userData.expiresIn < new Date().getTime()) {
    dispatch({ type: SIGN_IN, payload: { isLoaded: true } });
    localStorage.removeItem("userData");
    return;
  }
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    localStorage.removeItem("userData");
    dispatch({ type: SIGN_IN, payload: { isLoaded: true } });
  }, userData.expiresIn - new Date().getTime());

  dispatch({ type: SIGN_IN, payload: { ...userData, isLoaded: true } });
};

export const getUserProfile = (username) => async (dispatch) => {
  dispatch({
    type: GET_USER_PROFILE_LOADING,
  });
  let res = await server.get(`${USER_BASE_ROUTE}/${username}`);
  // PROVJERI

  let profile = res.data;
  dispatch({
    type: GET_USER_PROFILE,
    payload: { ...profile.user, postCount: profile.postCount },
  });
};

export const getUserProfilesByIds = (ids, type) => async (dispatch) => {
  if (ids.length === 0) {
    dispatch({
      type: GET_USER_PROFILES_BY_IDS,
      payload: { users: [], type },
    });
    return;
  }
  let queryObj = { users: ids };
  let queryObjJson = JSON.stringify(queryObj);
  let res = await server.get(`${USER_BASE_ROUTE}?users=${queryObjJson}`);

  dispatch({
    type: GET_USER_PROFILES_BY_IDS,
    payload: { users: res.data.users, type },
  });
};

const getUsersByIds = async (ids, type) => {
  if (ids.length === 0) {
    return {
      type: type,
      payload: [],
    };
  }
  let queryObj = { users: ids };
  let queryObjJson = JSON.stringify(queryObj);
  let res = await server.get(`${USER_BASE_ROUTE}?users=${queryObjJson}`);

  return {
    type: type,
    payload: res.data.users,
  };
};

export const getUsersWhoLiked = (ids) => async (dispatch) => {
  let dispatchObject = await getUsersByIds(ids, GET_USERS_WHO_LIKED);
  console.log(dispatchObject);
  dispatch(dispatchObject);
};

export const getFollowers = (ids) => async (dispatch) => {
  let dispatchObject = await getUsersByIds(ids, GET_FOLLOWERS);
  dispatch(dispatchObject);
};
export const getFollowing = (ids) => async (dispatch) => {
  let dispatchObject = await getUsersByIds(ids, GET_FOLLOWING);
  dispatch(dispatchObject);
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

export const followUser = (uid, followedId) => async (dispatch) => {
  let res = await server.post(`${USER_BASE_ROUTE}/${uid}/follows`, {
    followedId,
  });

  dispatch({ type: FOLLOW_USER, payload: res.data.userId });
};

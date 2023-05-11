import server from "../config/server";
import {
  GET_POSTS_OF_FOLLOWS,
  GET_POSTS_OF_FOLLOWS_LOADING,
  GET_POST_BY_ID,
  GET_POST_BY_ID_LOADING,
  GET_PROFILE_POSTS,
  GET_PROFILE_POSTS_LOADING,
  LIKE_POST,
  REMOVE_POST_LIKE,
  SET_POST_ENTERED_FROM_PROFILE,
} from "./types";

const POST_BASE_ROUTE = "/api/posts";

// export const getProfilePosts = () => async (dispatch, getState) => {
//   let uid = getState().profile._id;
//   let res = await server.get(`${POST_BASE_ROUTE}`, {
//     params: { creator: uid },
//   });

//   dispatch({ type: GET_PROFILE_POSTS, payload: res.data.posts });
// };

export const getProfilePosts = () => async (dispatch, getState) => {
  dispatch({ type: GET_PROFILE_POSTS_LOADING });
  let uid = getState().profile._id;
  let res = await server.get(`${POST_BASE_ROUTE}`, {
    params: { creator: uid },
  });
  dispatch({ type: GET_PROFILE_POSTS, payload: res.data.posts });
};

export const getPostsOfFollows = (uid) => async (dispatch) => {
  dispatch({ type: GET_POSTS_OF_FOLLOWS_LOADING });
  let res = await server.get(`${POST_BASE_ROUTE}`, {
    params: { uid: uid },
  });
  dispatch({ type: GET_POSTS_OF_FOLLOWS, payload: res.data.posts });
};

export const getPostById = (pid) => async (dispatch) => {
  dispatch({ type: GET_POST_BY_ID_LOADING });
  let res = await server.get(`${POST_BASE_ROUTE}/${pid}`);

  dispatch({
    type: GET_POST_BY_ID,
    payload: res.data.post,
  });
};

export const likePost = (pid, uid) => async (dispatch) => {
  let res = await server.post(`${POST_BASE_ROUTE}/${pid}/likes`, {
    userId: uid,
  });

  dispatch({ type: LIKE_POST, payload: res.data.like });
};

export const removePostLike = (pid, uid) => async (dispatch) => {
  let res = await server.delete(`${POST_BASE_ROUTE}/${pid}/likes/${uid}`);
  dispatch({ type: REMOVE_POST_LIKE, payload: res.data.like });
};

export const setPostEnteredFromProfile = (isEnteredFromProfile) => {
  return { type: SET_POST_ENTERED_FROM_PROFILE, payload: isEnteredFromProfile };
};

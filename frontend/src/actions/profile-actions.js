import server from "../config/server";
import {
  CHANGE_PROFILE_IMAGE,
  GET_PROFILE_POSTS,
  GET_USER_PROFILE,
  REMOVE_PROFILE_IMAGE,
} from "./types";

const USER_BASE_ROUTE = "/api/users";
const POST_BASE_ROUTE = "/api/posts";

// export const getUserProfile = (username) => async (dispatch) => {
//   let res = await server.get(`${USER_BASE_ROUTE}/${username}`);
//   // PROVJERI

//   let profile = res.data;
//   dispatch({
//     type: GET_USER_PROFILE,
//     payload: { ...profile.user, postCount: profile.postCount },
//   });
// };

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

export const getProfilePosts = () => async (dispatch, getState) => {
  let uid = getState().profile._id;
  let res = await server.get(`${POST_BASE_ROUTE}`, {
    params: { creator: uid },
  });

  dispatch({ type: GET_PROFILE_POSTS, payload: res.data.posts });
};
